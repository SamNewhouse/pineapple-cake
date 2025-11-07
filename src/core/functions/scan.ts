import { scanBarcodeAPI } from "../api/scan";
import { hasTimedData, addTimedData } from "../../lib/storage";
import { Item, LocalStorage, ScanResult } from "../../types";
import { log, logError } from "../../lib/logging";
import { EXPO_PUBLIC_STAGE } from "../../config/variables";

export const BASE_PROBABILITY = 0.11;
export const GROWTH_MIN = 0.003;
export const GROWTH_MAX = 0.022;
export const MAX_PROBABILITY = 0.455;

/**
 * Given the previous probability, return the next probability and log growth details.
 * Always accumulates unless capped. Only reset externally.
 */
export function getNextProbability(previous: number) {
  if (
    typeof previous !== "number" ||
    isNaN(previous) ||
    previous < BASE_PROBABILITY ||
    previous > MAX_PROBABILITY
  ) {
    const msg = `[getNextProbability] Invalid previous probability: ${previous}. Must supply the last valid probability from state!`;
    logError(msg);
    throw new Error(msg);
  }

  const growth = Math.random() * (GROWTH_MAX - GROWTH_MIN) + GROWTH_MIN;
  const next = Math.min(previous + growth, MAX_PROBABILITY);

  log(
    `[ScanProb]: ${(previous * 100).toFixed(2)}% + ${(growth * 100).toFixed(2)}% = ${(next * 100).toFixed(2)}%`,
  );
  return next;
}

/**
 * Logs and returns BASE_PROBABILITY
 */
export function getResetProbability() {
  // eslint-disable-next-line no-console
  console.log(`Probability reset to base: ${(BASE_PROBABILITY * 100).toFixed(1)}%`);
  return BASE_PROBABILITY;
}

/**
 * Handles barcode scan logic using the *current* unlock probability.
 * Probability must be managed outside—reset to BASE_PROBABILITY on unlock.
 */
export async function processBarcodeScan({
  scanResult,
  playerId,
  scannerLocked,
  unlockProbability,
}: {
  scanResult: { data: string };
  playerId: string;
  scannerLocked: boolean;
  unlockProbability: number;
}): Promise<ScanResult> {
  const isDev = EXPO_PUBLIC_STAGE === "dev";
  if (!playerId) return { success: false, message: "No player ID; not logged in." };
  if (scannerLocked || !scanResult?.data) {
    return { success: false, message: "Invalid scan." };
  }

  const barCodeData = sterilizeBarcode(scanResult.data);

  // Only check for duplicates and save outside dev
  if (!isDev) {
    const alreadyScanned = await hasTimedData(LocalStorage.BARCODE, barCodeData);
    if (alreadyScanned) {
      log("[SCAN.exists] Barcode already in storage:", barCodeData);
      return { success: false, message: "You've already scanned this barcode." };
    }
    await addTimedData(LocalStorage.BARCODE, barCodeData);
  }

  log(`Scan used probability: ${(unlockProbability * 100).toFixed(1)}%`);
  const unlocked = Math.random() < unlockProbability;

  if (!unlocked) {
    return { success: false, message: "Better luck next time!" };
  }

  try {
    const apiResult: Item = await scanBarcodeAPI(playerId);
    if (apiResult && typeof apiResult === "object" && apiResult.id) {
      log("ITEM ADDED: ", apiResult);
      return {
        success: true,
        message: "Item unlocked!",
        awardedItem: apiResult,
      };
    } else {
      return {
        success: false,
        message: "Scan API did not return a valid item.",
      };
    }
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return {
      success: false,
      message: error.message || "Network error.",
    };
  }
}

/**
 * Returns a sterilized, flat string: removes all whitespace and trims it.
 * Optionally remove all non-alphanumeric characters and force uppercase.
 */
export function sterilizeBarcode(
  raw: string,
  { alphanumOnly = false, toUpper = false } = {},
): string {
  let sanitized = raw.replace(/\s+/g, "");
  if (alphanumOnly) sanitized = sanitized.replace(/[^a-zA-Z0-9]/g, "");
  if (toUpper) sanitized = sanitized.toUpperCase();
  return sanitized.trim();
}

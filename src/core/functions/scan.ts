import { scanBarcodeAPI } from "../api/scan";
import { hasTimedData, addTimedData, clearStorage } from "../../lib/storage";
import { Item, LocalStorage, ScanResult } from "../../types";
import { log } from "../../lib/logging";

export const BASE_PROBABILITY = 0.1;
export const GROWTH_MIN = 0.003;
export const GROWTH_MAX = 0.015;
export const MAX_PROBABILITY = 0.455;

interface ProcessBarcodeScan {
  scanResult: { data: string };
  playerId: string;
  scannerLocked: boolean;
  stage: string;
  unlockProbability: number;
}

/**
 * Returns the next incremented unlock probability based on previous probability.
 * Applies a random growth each call, within constants defined above.
 */
export function nextUnlockProbability(currentProbability: number): number {
  const growth = Math.random() * (GROWTH_MAX - GROWTH_MIN) + GROWTH_MIN;
  const newProb =
    currentProbability === null || typeof currentProbability === "undefined"
      ? BASE_PROBABILITY
      : Math.min(currentProbability + growth, MAX_PROBABILITY);

  log(`New probability: ${(newProb * 100).toFixed(1)}% (Added growth: ${growth.toFixed(3)})`);
  return newProb;
}

/**
 * Handles barcode scan logic using the *current* unlock probability.
 * Probability must be managed outside—reset to BASE_PROBABILITY on unlock.
 */
export async function processBarcodeScan({
  scanResult,
  playerId,
  scannerLocked,
  stage,
  unlockProbability,
}: ProcessBarcodeScan): Promise<ScanResult> {
  if (!playerId) return { success: false, message: "No player ID; not logged in." };
  if (stage === "dev") await clearStorage(LocalStorage.BARCODE);
  if (scannerLocked || !scanResult?.data) {
    return { success: false, message: "Invalid scan." };
  }

  const barCodeData = sterilizeBarcode(scanResult.data);

  const alreadyScanned = await hasTimedData(LocalStorage.BARCODE, barCodeData);
  if (alreadyScanned) {
    log("[SCAN.exists] Barcode already in storage:", barCodeData);
    return { success: false, message: "You've already scanned this barcode." };
  }

  await addTimedData(LocalStorage.BARCODE, barCodeData);

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

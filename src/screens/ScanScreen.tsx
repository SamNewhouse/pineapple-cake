import React, { useState, useCallback } from "react";
import { Layout, useTheme } from "@ui-kitten/components";
import Camera from "../components/Camera";
import { BarcodeScanningResult } from "expo-camera";
import { ProcessingView } from "../components/ProcessingView";
import { ResultView } from "../components/ResultView";
import { scanBarcodeAPI } from "../api/scan";
import { hasTimedData, addTimedData, clearStorage } from "../core/storage";
import { StorageKey } from "../types";
import { log } from "../core/logging";
import { STAGE } from "react-native-dotenv";

// Define key with type safety
const BARCODE_KEY: StorageKey = "barcodes";

export default function ScanScreen() {
  const theme = useTheme();
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [scannerLocked, setScannerLocked] = useState(false);

  const handleBarcodeScan = useCallback(
    async (scanResult: BarcodeScanningResult) => {
      if (STAGE === "dev") {
        await clearStorage(BARCODE_KEY);
        log("[SCAN.clear] Cleared barcode storage (dev mode).");
      }

      if (scannerLocked || !scanResult?.data) {
        log("[SCAN.ignore] Ignored scan event (locked or empty).");
        return;
      }
      setScannerLocked(true);
      setProcessing(true);
      setResult(null);

      const alreadyScanned = await hasTimedData(BARCODE_KEY, scanResult.data);
      if (!alreadyScanned) {
        await addTimedData(BARCODE_KEY, scanResult.data);
        log("[SCAN.store] Stored new barcode:", scanResult.data);

        try {
          const apiResult = await scanBarcodeAPI("258752952", scanResult.data);
          setResult(apiResult);
        } catch (e) {
          setResult({ error: e });
        } finally {
          setProcessing(false);
        }
      } else {
        log("[SCAN.exists] Barcode already in storage:", scanResult.data);
        setProcessing(false);
        setScannerLocked(false);
      }
    },
    [scannerLocked, STAGE],
  );

  const resetScan = useCallback(() => {
    log("[SCAN.reset] Resetting scan state.");
    setScannerLocked(false);
    setResult(null);
    setProcessing(false);
  }, []);

  if (processing) {
    log("[SCAN.processing] Showing processing state.");
    return <ProcessingView theme={theme} />;
  }

  if (result) {
    log("[SCAN.result] Showing result view.");
    return <ResultView theme={theme} result={result} resetScan={resetScan} />;
  }

  log("[SCAN.ready] Ready to scan.");
  return (
    <Layout style={{ flex: 1, backgroundColor: theme["color-dark"] }}>
      <Camera onBarcodeScanned={handleBarcodeScan} />
    </Layout>
  );
}

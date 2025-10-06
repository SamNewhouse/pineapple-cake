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

// Define which storage key to use for scanned barcodes
const BARCODE_KEY: StorageKey = "barcodes";

export default function ScanScreen() {
  const theme = useTheme();
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [scannerLocked, setScannerLocked] = useState(false);

  // Handler for processing a scanned barcode
  const handleBarcodeScan = useCallback(
    async (scanResult: BarcodeScanningResult) => {
      // In development, clear storage before every scan for easier testing
      if (STAGE === "dev") {
        await clearStorage(BARCODE_KEY);
      }

      // If scanner is in use or there's no data, do nothing
      if (scannerLocked || !scanResult?.data) {
        return;
      }
      // Lock the scanner and show processing feedback
      setScannerLocked(true);
      setProcessing(true);
      setResult(null);

      // Check if this barcode has already been processed
      const alreadyScanned = await hasTimedData(BARCODE_KEY, scanResult.data);
      if (!alreadyScanned) {
        // If not, call the backend to process the barcode
        try {
          const apiResult = await scanBarcodeAPI("258752952", scanResult.data);
          setResult(apiResult);

          // Only store the barcode if the API call was successful (no error)
          if (!apiResult?.error) {
            await addTimedData(BARCODE_KEY, scanResult.data);
          }
        } catch (e) {
          // Handle errors from API
          setResult({ error: e });
        } finally {
          // Done processing regardless of success/failure
          setProcessing(false);
        }
      } else {
        // If barcode was already scanned, show info and unlock
        log("[SCAN.exists] Barcode already in storage:", scanResult.data);
        setProcessing(false);
        setScannerLocked(false);
      }
    },
    [scannerLocked, STAGE],
  );

  // Handler to reset scan state for scanning another barcode
  const resetScan = useCallback(() => {
    setScannerLocked(false);
    setResult(null);
    setProcessing(false);
  }, []);

  // Show processing view while handling a scan
  if (processing) {
    return <ProcessingView theme={theme} />;
  }

  // Show scan result if available
  if (result) {
    return <ResultView theme={theme} result={result} resetScan={resetScan} />;
  }

  // Main scan camera view
  return (
    <Layout style={{ flex: 1, backgroundColor: theme["color-dark"] }}>
      <Camera onBarcodeScanned={handleBarcodeScan} />
    </Layout>
  );
}

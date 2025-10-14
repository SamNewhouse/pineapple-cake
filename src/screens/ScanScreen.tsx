import React, { useState, useCallback } from "react";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import Camera from "../components/Camera";
import { BarcodeScanningResult } from "expo-camera";
import { ProcessingView } from "../components/ProcessingView";
import { ResultView } from "../components/ResultView";
import { scanBarcodeAPI } from "../api/scan";
import { hasTimedData, addTimedData, clearStorage } from "../core/storage";
import { StorageKey } from "../types";
import { log } from "../core/logging";
import { STAGE } from "react-native-dotenv";
import { useRequiredPlayer } from "../context/PlayerContext";

export default function ScanScreen() {
  const player = useRequiredPlayer();
  const theme = useTheme();
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [scannerLocked, setScannerLocked] = useState(false);

  const handleBarcodeScan = useCallback(
    async (scanResult: BarcodeScanningResult) => {
      if (STAGE === "dev") {
        await clearStorage(StorageKey.barcodes);
      }

      if (scannerLocked || !scanResult?.data) {
        return;
      }
      setScannerLocked(true);
      setProcessing(true);
      setResult(null);

      const alreadyScanned = await hasTimedData(StorageKey.barcodes, scanResult.data);
      if (!alreadyScanned) {
        try {
          const apiResult = await scanBarcodeAPI(player.playerId, scanResult.data);
          setResult(apiResult);

          if (!apiResult?.error) {
            await addTimedData(StorageKey.barcodes, scanResult.data);
          }
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
    [scannerLocked, STAGE, player],
  );

  const resetScan = useCallback(() => {
    setScannerLocked(false);
    setResult(null);
    setProcessing(false);
  }, []);

  if (processing) {
    return <ProcessingView theme={theme} />;
  }

  if (result) {
    return <ResultView theme={theme} result={result} resetScan={resetScan} />;
  }

  return (
    <Layout style={{ flex: 1, backgroundColor: theme["color-dark"] }}>
      <Camera onBarcodeScanned={handleBarcodeScan} />
    </Layout>
  );
}

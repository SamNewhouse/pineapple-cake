import React, { useState, useCallback } from "react";
import { Layout, useTheme } from "@ui-kitten/components";
import Camera from "../Camera";
import { BarcodeScanningResult } from "expo-camera";
import { ResultView } from "../ResultView";
import { scanBarcodeAPI } from "../../api/scan";
import { hasTimedData, addTimedData, clearStorage } from "../../core/storage";
import { LocalStorage } from "../../types";
import { log } from "../../core/logging";
import { Loading } from "../Loading";
import { useRequiredPlayer } from "../../context/GameContext";
import { EXPO_PUBLIC_STAGE } from "../../core/variables";

export default function ScanScreen() {
  const { player } = useRequiredPlayer();
  const theme = useTheme();
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [scannerLocked, setScannerLocked] = useState(false);

  const handleBarcodeScan = useCallback(
    async (scanResult: BarcodeScanningResult) => {
      if (EXPO_PUBLIC_STAGE === "dev") {
        await clearStorage(LocalStorage.BARCODE);
      }

      if (scannerLocked || !scanResult?.data) {
        return;
      }
      setScannerLocked(true);
      setProcessing(true);
      setResult(null);

      const alreadyScanned = await hasTimedData(LocalStorage.BARCODE, scanResult.data);
      if (!alreadyScanned) {
        try {
          const apiResult = await scanBarcodeAPI(player.id, scanResult.data);
          setResult(apiResult);

          if (!apiResult?.error) {
            await addTimedData(LocalStorage.BARCODE, scanResult.data);
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
    [scannerLocked, EXPO_PUBLIC_STAGE, player],
  );

  const resetScan = useCallback(() => {
    setScannerLocked(false);
    setResult(null);
    setProcessing(false);
  }, []);

  if (processing) {
    return <Loading message="Processing scan..." />;
  }

  if (result) {
    return <ResultView result={result} resetScan={resetScan} />;
  }

  return (
    <Layout style={{ flex: 1, backgroundColor: theme["color-dark"] }}>
      <Camera onBarcodeScanned={handleBarcodeScan} />
    </Layout>
  );
}

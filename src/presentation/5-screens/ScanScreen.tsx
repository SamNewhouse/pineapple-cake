import React, { useState, useCallback } from "react";
import { View } from "react-native";
import Camera from "../1-atoms/Camera";
import { BarcodeScanningResult } from "expo-camera";
import { ResultView } from "../2-molecules/ResultView";
import { hasTimedData, addTimedData, clearStorage } from "../../lib/storage";
import { LocalStorage } from "../../types";
import { log } from "../../lib/logging";
import { Loading } from "../1-atoms/Loading";
import { useRequiredPlayer } from "../../context/GameContext";
import { EXPO_PUBLIC_STAGE } from "../../config/variables";
import { scanBarcodeAPI } from "../../core/api/scan";

export default function ScanScreen() {
  const { player } = useRequiredPlayer();
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
    <View style={{ flex: 1, backgroundColor: "#1D1D1D" }}>
      <Camera onBarcodeScanned={handleBarcodeScan} />
    </View>
  );
}

import React, { useState, useCallback } from "react";
import { View } from "react-native";
import Camera from "../1-atoms/Camera";
import { BarcodeScanningResult } from "expo-camera";
import { Loading } from "../1-atoms/Loading";
import { ResultView } from "../2-molecules/ResultView";
import { ScanResult } from "../../types";
import {
  processBarcodeScan,
  nextUnlockProbability,
  BASE_PROBABILITY,
} from "../../core/functions/scan";
import { useGame, useRequiredPlayer } from "../../context/GameContext";
import { EXPO_PUBLIC_STAGE } from "../../config/variables";
import { waitRandomDelayUntilDone } from "../../utils/time";

export default function ScanScreen() {
  const { player } = useRequiredPlayer();
  const { setItems } = useGame();
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scannerLocked, setScannerLocked] = useState(false);
  const [unlockProbability, setUnlockProbability] = useState(BASE_PROBABILITY);

  const handleBarcodeScanned = useCallback(
    async (scanResult: BarcodeScanningResult) => {
      if (processing || scannerLocked || !scanResult?.data) return;
      setProcessing(true);
      setResult(null);
      setScannerLocked(true);

      try {
        const apiResult = await waitRandomDelayUntilDone(
          processBarcodeScan({
            scanResult,
            playerId: player.id,
            scannerLocked,
            stage: EXPO_PUBLIC_STAGE,
            unlockProbability,
          }),
          300,
          800,
        );

        setResult(apiResult);
        setProcessing(false);
        setScannerLocked(false);

        if (apiResult.success && apiResult.awardedItem) {
          setItems((prev) => [apiResult.awardedItem!, ...prev]);
          setUnlockProbability(BASE_PROBABILITY);
        } else if (!apiResult.success) {
          setUnlockProbability((prev) => nextUnlockProbability(prev));
        }
      } catch {
        setResult({
          success: false,
          message: "Sorry, the scan took too long. Try again!",
        });
        setProcessing(false);
        setScannerLocked(false);
      }
    },
    [processing, scannerLocked, player.id, EXPO_PUBLIC_STAGE, setItems, unlockProbability],
  );

  const resetScan = useCallback(() => {
    setScannerLocked(false);
    setResult(null);
    setProcessing(false);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#1D1D1D" }}>
      {processing ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Loading message="Processing scan..." />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {result ? (
            <ResultView result={result} resetScan={resetScan} />
          ) : (
            <Camera onBarcodeScanned={handleBarcodeScanned} />
          )}
        </View>
      )}
    </View>
  );
}

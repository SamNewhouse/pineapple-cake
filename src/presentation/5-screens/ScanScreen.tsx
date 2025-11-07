import React, { useEffect, useCallback, useRef } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Camera from "../1-atoms/Camera";
import { BarcodeScanningResult } from "expo-camera";
import { Loading } from "../1-atoms/Loading";
import { ResultView } from "../2-molecules/ResultView";
import { RootState, AppDispatch } from "../../store";
import { clearResult, performBarcodeScan, setUnlockProbability } from "../../store/scanSlice";
import { BASE_PROBABILITY, getNextProbability } from "../../core/functions/scan";
import { addItem } from "../../store/itemSlice";

export default function ScanScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const player = useSelector((state: RootState) => state.player.player);
  const scan = useSelector((state: RootState) => state.scan);
  const unlockProbability = useSelector((state: RootState) => state.scan.unlockProbability);
  const probabilityRef = useRef(unlockProbability);

  useEffect(() => {
    dispatch(clearResult());
  }, [dispatch]);

  useEffect(() => {
    probabilityRef.current = unlockProbability;
  }, [unlockProbability]);

  const isDev = __DEV__;

  const handleBarcodeScanned = useCallback(
    async (scanResult: BarcodeScanningResult) => {
      const shouldBlockScan =
        !__DEV__ &&
        (scan.scanning || scan.result || scan.error || !player?.id || !scanResult?.data);

      if (shouldBlockScan) return;

      const currentProbability = probabilityRef.current;
      dispatch(
        performBarcodeScan({
          scanResult,
          playerId: player!.id,
          scannerLocked: false,
          unlockProbability: currentProbability,
        }),
      ).then((action: any) => {
        if (performBarcodeScan.fulfilled.match(action)) {
          if (action.payload.success && action.payload.awardedItem) {
            dispatch(addItem(action.payload.awardedItem));
            dispatch(setUnlockProbability(BASE_PROBABILITY));
          } else if (!action.payload.success) {
            const prev = probabilityRef.current;
            const nextProb = getNextProbability(prev);
            dispatch(setUnlockProbability(nextProb));
          }
        }
      });
    },
    [dispatch, player, scan, isDev],
  );

  const resetScan = useCallback(() => {
    dispatch(clearResult());
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      {scan.scanning ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Loading message="Processing scan..." />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {scan.result ? (
            <ResultView result={scan.result} resetScan={resetScan} />
          ) : (
            <Camera onBarcodeScanned={handleBarcodeScanned} />
          )}
        </View>
      )}
    </View>
  );
}

import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import { BarcodeScanningResult, BarcodeType, CameraView, useCameraPermissions } from "expo-camera";
import { Button } from "./Button";

interface CameraProps {
  onBarcodeScanned: (result: BarcodeScanningResult) => void;
}

function Camera({ onBarcodeScanned }: CameraProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [noScanWarning, setNoScanWarning] = useState(false);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const barcodeTypes: BarcodeType[] = [
    "codabar",
    "code128",
    "code39",
    "code93",
    "ean13",
    "ean8",
    "itf14",
    "upc_a",
    "upc_e",
  ];

  const handleScan = (result: BarcodeScanningResult) => {
    setNoScanWarning(false);
    onBarcodeScanned(result);

    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    scanTimeoutRef.current = setTimeout(() => setNoScanWarning(true), 4000);
  };

  React.useEffect(() => {
    scanTimeoutRef.current = setTimeout(() => setNoScanWarning(true), 5000);
    return () => {
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    };
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#EBEBED", marginBottom: 24, fontSize: 18, fontWeight: "bold" }}>
          Camera access is required
        </Text>
        <Button onPress={requestPermission}>Grant Camera Permission</Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: "90%",
          height: "60%",
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: "#232527",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CameraView
          style={{ width: "100%", height: "100%" }}
          facing="back"
          onBarcodeScanned={handleScan}
          barcodeScannerSettings={{
            barcodeTypes: barcodeTypes,
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: "10%",
            right: "10%",
            height: 2,
            backgroundColor: "#B4BBC3",
            top: "50%",
            borderRadius: 2,
          }}
        />
        {noScanWarning && (
          <View
            style={{
              position: "absolute",
              bottom: 18,
              left: 0,
              right: 0,
              alignItems: "center",
              backgroundColor: "rgba(30,0,0,0.7)",
              paddingVertical: 7,
              paddingHorizontal: 9,
              borderRadius: 8,
              marginHorizontal: 20,
            }}
          >
            <Text style={{ color: "#E76060", fontWeight: "bold" }}>
              Barcode type not supported or not detected!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default React.memo(Camera);

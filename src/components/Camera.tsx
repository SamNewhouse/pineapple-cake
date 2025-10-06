import React from "react";
import { View, Text, Button } from "react-native";
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { useTheme } from "@ui-kitten/components";
import { CameraScreenProps } from "../types";

export default function CameraScreen({ onBarcodeScanned }: CameraScreenProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const theme = useTheme();

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme["color-text"] }}>
          We need your permission to show the camera
        </Text>
        <Button
          title="Grant Permission"
          onPress={requestPermission}
          color={theme["scanner-success-color"]}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: "90%",
          height: 240,
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: theme["color-surface"],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CameraView
          style={{ width: "100%", height: "100%" }}
          facing="back"
          onBarcodeScanned={onBarcodeScanned}
        />
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: "10%",
            right: "10%",
            height: 2,
            backgroundColor: theme["scanner-line-color"],
            top: "50%",
            borderRadius: 2,
          }}
        />
      </View>
    </View>
  );
}

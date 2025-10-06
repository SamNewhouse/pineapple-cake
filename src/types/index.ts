import { BarcodeScanningResult } from "expo-camera";

export type Screen = "home" | "scan" | "inventory";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export type StorageKey = "barcodes" | "users" | "tokens" | "scores" | "settings";

export type CameraScreenProps = {
  onBarcodeScanned: (result: BarcodeScanningResult) => void;
};

import { BarcodeScanningResult } from "expo-camera";

export type Screen = "home" | "scan" | "items" | "trade";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export enum StorageKey {
  barcodes = "barcodes",
  players = "players",
  sessions = "sessions",
  settings = "settings",
}

export type CameraScreenProps = {
  onBarcodeScanned: (result: BarcodeScanningResult) => void;
};

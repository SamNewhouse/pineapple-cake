import { BarcodeScanningResult } from "expo-camera";

export type Screen = "home" | "scan" | "items" | "trade" | "settings";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export enum StorageKey {
  barcodes = "barcodes",
  players = "players",
  settings = "settings",
}

export type CameraProps = {
  onBarcodeScanned: (result: BarcodeScanningResult) => void;
};

export interface Player {
  playerId: string;
  email: string;
  username: string;
  totalScans: number;
  createdAt: string;
  token?: string;
}

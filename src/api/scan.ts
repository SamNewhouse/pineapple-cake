import { EXTERNAL_TUNNEL_URL } from "react-native-dotenv";
import { httpRequest } from "../core/http";

const API_URL = `${EXTERNAL_TUNNEL_URL}/dev/scan/process`;

export function scanBarcodeAPI(playerId: string, barcode: string) {
  console.log(`[SCAN.api] Scanning barcode: "${barcode}"`);
  return httpRequest({
    url: API_URL,
    method: "post",
    data: { playerId, barcode },
  });
}

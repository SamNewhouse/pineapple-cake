import { httpRequest } from "../core/http";
import { log } from "../core/logging";
import { EXPO_PUBLIC_TUNNEL_URL } from "../core/variables";

export function scanBarcodeAPI(id: string, barcode: string) {
  log(`[SCAN.api] Scanning barcode: "${barcode}"`);
  return httpRequest({
    url: `${EXPO_PUBLIC_TUNNEL_URL}/dev/scan/process`,
    method: "post",
    data: {
      id: id,
      barcode: barcode,
    },
  });
}

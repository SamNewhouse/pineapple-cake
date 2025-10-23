import { httpRequest } from "../../lib/http";
import { log } from "../../lib/logging";
import { EXPO_PUBLIC_TUNNEL_URL } from "../../config/variables";

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

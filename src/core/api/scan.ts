import { httpRequest } from "../../lib/http";
import { log } from "../../lib/logging";
import { EXPO_PUBLIC_URL } from "../../config/variables";

export function scanBarcodeAPI(id: String) {
  return httpRequest({
    url: `${EXPO_PUBLIC_URL}/dev/scan/process`,
    method: "post",
    data: {
      id: id,
    },
  });
}

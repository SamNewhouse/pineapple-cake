import { httpRequest } from "../../lib/http";
import { EXPO_PUBLIC_URL } from "../../config/variables";

// Get details of a specific item by ID
export function getItemByIdAPI(id: string) {
  return httpRequest({
    url: `${EXPO_PUBLIC_URL}/dev/item/${id}`,
    method: "get",
  });
}

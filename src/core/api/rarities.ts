import { httpRequest } from "../../lib/http";
import { EXPO_PUBLIC_URL } from "../../config/variables";

export async function getAllRaritiesAPI() {
  const response = await httpRequest({
    url: `${EXPO_PUBLIC_URL}/dev/rarities`,
    method: "get",
  });

  return response.rarities;
}

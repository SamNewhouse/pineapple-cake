import { httpRequest } from "../../lib/http";
import { EXPO_PUBLIC_URL } from "../../config/variables";

export async function getAllCollectablesAPI() {
  const response = await httpRequest({
    url: `${EXPO_PUBLIC_URL}/dev/collectables`,
    method: "get",
  });

  return response.collectables;
}

import { httpRequest } from "../core/http";
import { EXPO_PUBLIC_TUNNEL_URL } from "../core/variables";

// Get all items for a specific player (inventory)
export function getPlayerItemsAPI(playerId: string, authToken?: string) {
  const headers: Record<string, string> | undefined = authToken
    ? { Authorization: `Bearer ${authToken}` }
    : undefined;

  return httpRequest({
    url: `${EXPO_PUBLIC_TUNNEL_URL}/dev/player/${playerId}/items`,
    method: "get",
    headers,
  });
}

// Get details of a specific item by ID
export function getItemAPI(id: string) {
  return httpRequest({
    url: `${EXPO_PUBLIC_TUNNEL_URL}/dev/item/${id}`,
    method: "get",
  });
}

// Get all catalog items (for reference data)
export function getCollectablesAPI() {
  return httpRequest({
    url: `${EXPO_PUBLIC_TUNNEL_URL}/dev/collectables`,
    method: "get",
  });
}

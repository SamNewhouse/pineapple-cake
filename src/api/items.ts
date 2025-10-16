import { EXTERNAL_TUNNEL_URL } from "react-native-dotenv";
import { httpRequest } from "../core/http";
import { Item, Collectable } from "../types";

// Get all items for a specific player (inventory)
export function getPlayerItemsAPI(playerId: string, authToken?: string) {
  const headers: Record<string, string> | undefined = authToken
    ? { Authorization: `Bearer ${authToken}` }
    : undefined;

  return httpRequest({
    url: `${EXTERNAL_TUNNEL_URL}/dev/player/${playerId}/items`,
    method: "get",
    headers,
  });
}

// Get details of a specific item by ID
export function getItemAPI(itemId: string) {
  return httpRequest({
    url: `${EXTERNAL_TUNNEL_URL}/dev/item/${itemId}`,
    method: "get",
  });
}

// Get all catalog items (for reference data)
export function getCollectablesAPI() {
  return httpRequest({
    url: `${EXTERNAL_TUNNEL_URL}/dev/collectables`,
    method: "get",
  });
}

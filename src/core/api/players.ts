import { Player, Item, Collectable } from "../../types";
import { httpRequest } from "../../lib/http";
import { EXPO_PUBLIC_URL } from "../../config/variables";
import { logError } from "../../lib/logging";

export function getPlayerByIdAPI(playerId: string) {
  return httpRequest({
    url: `${EXPO_PUBLIC_URL}/dev/players/${playerId}`,
    method: "get",
  });
}

export function updatePlayerAPI(playerId: string, field: string, payload: Record<string, any>) {
  return httpRequest({
    url: `${EXPO_PUBLIC_URL}/dev/players/${playerId}/update/${field}`,
    method: "post",
    data: payload,
  });
}

export async function getPlayerItemsAPI(playerId: string): Promise<Item[]> {
  try {
    const response = await httpRequest({
      url: `${EXPO_PUBLIC_URL}/dev/players/${playerId}/items`,
      method: "get",
    });
    return response.items ?? [];
  } catch (error) {
    logError("Error fetching player items:", error);
    return [];
  }
}

export async function getPlayerTradesAPI(playerId: string) {
  const response = await httpRequest({
    url: `${EXPO_PUBLIC_URL}/dev/players/${playerId}/trades`,
    method: "get",
  });
  return response;
}

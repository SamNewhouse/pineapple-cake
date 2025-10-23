import { Player, Item, Collectable } from "../../types";
import { httpRequest } from "../../lib/http";
import { EXPO_PUBLIC_TUNNEL_URL } from "../../config/variables";

export function getPlayerByIdAPI(playerId: string) {
  return httpRequest({
    url: `${EXPO_PUBLIC_TUNNEL_URL}/dev/players/${playerId}`,
    method: "get",
  });
}

export function updatePlayerAPI(playerId: string, field: string, payload: Record<string, any>) {
  return httpRequest({
    url: `${EXPO_PUBLIC_TUNNEL_URL}/dev/players/${playerId}/update/${field}`,
    method: "post",
    data: payload,
  });
}

export async function getPlayerItemsAPI(playerId: string) {
  const response = await httpRequest({
    url: `${EXPO_PUBLIC_TUNNEL_URL}/dev/players/${playerId}/items`,
    method: "get",
  });

  return response.items;
}

export async function getPlayerTradesAPI(playerId: string) {
  const response = await httpRequest({
    url: `${EXPO_PUBLIC_TUNNEL_URL}/dev/players/${playerId}/trades`,
    method: "get",
  });
  return response;
}

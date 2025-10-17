import { addTimedData } from "../core/storage";
import { LocalStorage, Player, Item, Collectable } from "../types";
import { getPlayerItemsAPI, getCollectablesAPI } from "../api/items";
import { log } from "./logging";

/**
 * Stores the player in context and local storage after authentication.
 * Throws an Error if the player object is invalid.
 */
export async function handleLoginSuccess(
  player: Player | null | undefined,
  setPlayer: (player: Player) => void,
) {
  if (!player || !player.id || !player.token) {
    throw new Error("Login failed: Server did not return valid user data.");
  }
  setPlayer(player);
  log("[PLAYER.id] ", player.id);
  await addTimedData(LocalStorage.PLAYER, player, 90 * 24 * 60 * 60 * 1000);
}

/**
 * Fetches all player items.
 */
export async function fetchPlayerItems(player: Player): Promise<Item[]> {
  const resp = await getPlayerItemsAPI(player.id, player.token);
  return resp?.data?.items || [];
}

/**
 * Fetches all collectables.
 */
export async function fetchCollectables(): Promise<Collectable[]> {
  const resp = await getCollectablesAPI();
  return resp?.data?.items || [];
}

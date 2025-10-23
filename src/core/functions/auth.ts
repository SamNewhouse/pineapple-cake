import { storeData } from "../../lib/storage";
import { AuthenticatedPlayer, LocalStorage } from "../../types";

/**
 * Handles successful login: stores player permanently and token with TTL.
 */
export async function handleLoginSuccess(player: AuthenticatedPlayer) {
  if (!player || !player.id) {
    throw new Error("Login failed: Server did not return valid user data.");
  }

  return await storeData(LocalStorage.PLAYER, player);
}

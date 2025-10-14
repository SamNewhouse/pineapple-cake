import React, { createContext, useContext } from "react";
import { Player } from "../types";

// Shape of context value
export interface PlayerContextType {
  player: Player | null;
  setPlayer: (player: Player | null) => void;
}

// Context
export const PlayerContext = createContext<PlayerContextType>({
  player: null,
  setPlayer: () => {},
});

// Typed hook for general use (returns Player | null)
export function usePlayer(): PlayerContextType {
  return useContext(PlayerContext);
}

// Typed hook for authenticated screens (returns non-null Player)
export function useRequiredPlayer(): Player {
  const { player } = usePlayer();
  if (!player) {
    throw new Error("useRequiredPlayer called outside authenticated session");
  }
  return player;
}

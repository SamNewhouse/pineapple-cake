import React, { createContext, useContext, useState } from "react";
import { Item, Collectable, AuthenticatedPlayer, Rarity } from "../types";

type GameContextType = {
  player: AuthenticatedPlayer | null;
  setPlayer: React.Dispatch<React.SetStateAction<AuthenticatedPlayer | null>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  clearGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);
GameContext.displayName = "GameContext";

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}

export function useRequiredPlayer() {
  const { player, setPlayer } = useGame();
  if (!player) throw new Error("Tried to use player outside AuthGuard!");
  return { player, setPlayer };
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<AuthenticatedPlayer | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  const clearGame = () => {
    setPlayer(null);
    setItems([]);
  };

  return (
    <GameContext.Provider
      value={{
        player,
        setPlayer,
        items,
        setItems,
        clearGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

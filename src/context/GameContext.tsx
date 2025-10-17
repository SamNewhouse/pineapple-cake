import React, { createContext, useContext, useState } from "react";
import { Player, Item, Collectable } from "../types";

type GameContextType = {
  player: Player | null;
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  collectables: Collectable[];
  setCollectables: React.Dispatch<React.SetStateAction<Collectable[]>>;
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
  const [player, setPlayer] = useState<Player | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [collectables, setCollectables] = useState<Collectable[]>([]);

  const clearGame = () => {
    setPlayer(null);
    setItems([]);
    setCollectables([]);
  };

  return (
    <GameContext.Provider
      value={{
        player,
        setPlayer,
        items,
        setItems,
        collectables,
        setCollectables,
        clearGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

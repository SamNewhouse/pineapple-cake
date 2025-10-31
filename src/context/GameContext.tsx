// GameContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { Item, AuthenticatedPlayer } from "../types";
import { getPlayerItemsAPI } from "../core/api/players";
import { getData } from "../lib/storage";
import { LocalStorage } from "../types";

type GameContextType = {
  player: AuthenticatedPlayer | null;
  setPlayer: React.Dispatch<React.SetStateAction<AuthenticatedPlayer | null>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  loading: boolean;
  clearGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}

export function useRequiredPlayer() {
  const { player, setPlayer } = useGame();
  if (!player) throw new Error("Player context missing - this screen requires authentication.");
  return { player, setPlayer };
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<AuthenticatedPlayer | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayer = async () => {
      setLoading(true);
      const storedPlayer = await getData<AuthenticatedPlayer>(LocalStorage.PLAYER);
      if (storedPlayer?.token) {
        setPlayer(storedPlayer);
      } else {
        setPlayer(null);
      }
      setLoading(false);
    };
    loadPlayer();
  }, []);

  useEffect(() => {
    if (player?.id) {
      setLoading(true);
      getPlayerItemsAPI(player.id)
        .then((fetchedItems) => setItems(fetchedItems))
        .catch(() => setItems([]))
        .finally(() => setLoading(false));
    } else {
      setItems([]);
    }
  }, [player]);

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
        loading,
        clearGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

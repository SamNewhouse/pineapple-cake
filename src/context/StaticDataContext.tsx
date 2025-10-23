import React, { createContext, useContext, useEffect, useState } from "react";
import { Collectable, LocalStorage, Rarity } from "../types";
import { getData, storeData } from "../lib/storage";
import { getAllCollectablesAPI } from "../core/api/collectables";
import { getAllRaritiesAPI } from "../core/api/rarities";
import { logError } from "../lib/logging";

type StaticDataContextType = {
  collectables: Collectable[];
  rarities: Rarity[];
  ready: boolean;
};

const StaticDataContext = createContext<StaticDataContextType | undefined>(undefined);

export function useStaticData() {
  const ctx = useContext(StaticDataContext);
  if (!ctx) throw new Error("useStaticData must be used within StaticDataProvider");
  return ctx;
}

export function StaticDataProvider({ children }: { children: React.ReactNode }) {
  const [collectables, setCollectables] = useState<Collectable[]>([]);
  const [rarities, setRarities] = useState<Rarity[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadStaticData = async () => {
      try {
        const collectablesRaw = await getData(LocalStorage.COLLECTABLES);
        const raritiesRaw = await getData(LocalStorage.RARITIES);

        const safeCollectables = Array.isArray(collectablesRaw)
          ? (collectablesRaw as Collectable[])
          : [];
        const safeRarities = Array.isArray(raritiesRaw) ? (raritiesRaw as Rarity[]) : [];

        if (safeCollectables.length && safeRarities.length) {
          setCollectables(safeCollectables);
          setRarities(safeRarities);
        } else {
          const apiCollectables = await getAllCollectablesAPI();
          const apiRarities = await getAllRaritiesAPI();
          setCollectables(apiCollectables);
          setRarities(apiRarities);
          await storeData(LocalStorage.COLLECTABLES, apiCollectables);
          await storeData(LocalStorage.RARITIES, apiRarities);
        }
      } catch (error) {
        logError("[STATIC ERROR] Failed to load static data", error);
        setCollectables([]);
        setRarities([]);
      } finally {
        setReady(true);
      }
    };
    loadStaticData();
  }, []);

  return (
    <StaticDataContext.Provider value={{ collectables, rarities, ready }}>
      {children}
    </StaticDataContext.Provider>
  );
}

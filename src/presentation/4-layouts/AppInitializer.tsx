import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCollectables } from "../../store/collectableSlice";
import { getAllCollectablesAPI } from "../../core/api/collectables";
import { getAllRaritiesAPI } from "../../core/api/rarities";
import { setRarities } from "../../store/raritySlice";

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function loadStatic() {
      const [collectables, rarities] = await Promise.all([
        getAllCollectablesAPI(),
        getAllRaritiesAPI(),
      ]);
      dispatch(setCollectables(collectables));
      dispatch(setRarities(rarities));
    })();
  }, [dispatch]);
  return <>{children}</>;
}

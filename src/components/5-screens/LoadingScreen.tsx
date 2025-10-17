import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { Asset } from "expo-asset";
import { fetchPlayerItems, fetchCollectables } from "../../core/auth";
import { log, logError } from "../../core/logging";
import { Loading } from "../Loading";
import { useGame } from "../../context/GameContext";

type Props = {
  onLoadComplete: () => void;
};

export const LoadingScreen: React.FC<Props> = ({ onLoadComplete }) => {
  const { player, setItems, setCollectables } = useGame();

  useEffect(() => {
    if (!player?.id || !player?.token) {
      log("[LOADING.guard] Player missing or incomplete, skipping preload.");
      return;
    }

    log("[LOADING.start] --- App Preload Start ---");

    const preloadAll = async () => {
      try {
        log("[LOADING.asset] Loading app icon asset...");
        const assetPromise = Asset.loadAsync(require("../../../assets/icon.png"));

        log("[LOADING.items] Fetching player items...");
        const itemsPromise = fetchPlayerItems(player);

        log("[LOADING.collectables] Fetching collectables...");
        const collectablesPromise = fetchCollectables();

        const [items, collectables] = await Promise.all([itemsPromise, collectablesPromise]);
        setItems(items);
        setCollectables(collectables);

        log(
          `[LOADING.collectables] loaded: ${collectables.length} (Sample: ${
            collectables[0]?.name || "none"
          })`,
        );

        await assetPromise;
        log("[LOADING.asset] Asset loaded.");
      } catch (err) {
        logError("[LOADING.error] Error in preloadAll:", err);
      } finally {
        log("[LOADING.end] --- App Preload Complete ---");
        onLoadComplete();
      }
    };

    preloadAll();
  }, [player]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../../assets/icon.png")}
        style={{ width: 90, height: 90, marginBottom: 32 }}
        resizeMode="contain"
      />
      <Loading message="Loading your game data..." size="large" />
    </View>
  );
};

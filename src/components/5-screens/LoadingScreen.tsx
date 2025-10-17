import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { Asset } from "expo-asset";
import { getCollectablesAPI, getPlayerItemsAPI } from "../../api/items";
import { log, logError } from "../../core/logging";
import { Loading } from "../Loading";
import { useGame } from "../../context/GameContext";

type Props = {
  onLoadComplete: () => void;
};

export const LoadingScreen: React.FC<Props> = ({ onLoadComplete }) => {
  const { player, setItems, setCollectables } = useGame();

  useEffect(() => {
    if (!player) {
      log("[SCREEN.loading] No player available, waiting...");
      return;
    }
    log("[SCREEN.loading] Player present, starting preload.");

    const preloadAll = async () => {
      try {
        log("[SCREEN.loading] Loading asset...");
        const assetPromise = Asset.loadAsync(require("../../../assets/icon.png"));
        log("[SCREEN.loading] Fetching APIs...");
        const itemsPromise = getPlayerItemsAPI(player.id, player.token);
        const collectablesPromise = getCollectablesAPI();

        const [itemsResp, collectablesResp] = await Promise.all([
          itemsPromise,
          collectablesPromise,
        ]);

        // Set fetched items in context
        if (itemsResp?.success && Array.isArray(itemsResp.data?.items)) {
          setItems(itemsResp.data.items);
        } else {
          setItems([]);
          log("[SCREEN.loading] No player items found or error fetching.");
        }

        // Set fetched collectables in context
        const collectables = collectablesResp?.data?.items ?? [];
        setCollectables(collectables);
        log("[SCREEN.loading] Collectables sample:", collectables.slice?.(0, 1));

        await assetPromise;
        log("[SCREEN.loading] Asset loaded.");
      } catch (err) {
        logError("[SCREEN.loading] Error in preloadAll:", err);
      } finally {
        log("[SCREEN.loading] All done, calling onLoadComplete().");
        onLoadComplete();
      }
    };

    preloadAll();
    // Only rerun if player changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

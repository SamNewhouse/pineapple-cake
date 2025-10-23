import React, { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Asset } from "expo-asset";
import { log, logError } from "../../lib/logging";
import { Loading } from "../1-atoms/Loading";
import { useGame } from "../../context/GameContext";
import { getPlayerItemsAPI } from "../../core/api/players";

type Props = {
  onLoadComplete: () => void;
};

export const Preloader: React.FC<Props> = ({ onLoadComplete }) => {
  const { player, setItems } = useGame();

  useEffect(() => {
    if (!player?.id) {
      log("[LOADING.guard] Player missing or incomplete, skipping preload.");
      return;
    }

    log("[LOADING.start] --- App Preload Start ---");

    const preloadAll = async () => {
      try {
        const assetPromise = Asset.loadAsync(require("../../../assets/icon.png"));
        const items = await getPlayerItemsAPI(player.id);
        setItems(items);
        await assetPromise;
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
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.preloaderbox}>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Loading message="Loading your game data..." size="large" />
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height: height - 56,
    zIndex: 9999,
    backgroundColor: "#1D1D1D",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  preloaderbox: {
    flex: 0.5,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
});

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry, Layout } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import TopTabBar from "./src/components/TopTabBar";
import HomeScreen from "./src/screens/HomeScreen";
import ScanScreen from "./src/screens/ScanScreen";
import ItemsScreen from "./src/screens/ItemsScreen";
import { Screen, StorageKey } from "./src/types";
import scannerTheme from "./src/styling/theme.json";
import customMapping from "./src/styling/mapping.json";
import { StatusBar } from "expo-status-bar";
import { getTimedData } from "./src/core/storage";
import { AuthScreen } from "./src/screens/AuthScreen";

export default function App() {
  const [player, setPlayer] = useState<any | null>(null);
  const [screen, setScreen] = useState<Screen>("home");

  // Check local session/player on mount
  useEffect(() => {
    const checkPlayer = async () => {
      const players = await getTimedData(StorageKey.players);
      setPlayer(players.length > 0 ? players[0] : null);
    };
    checkPlayer();
  }, []);

  // Handle successful sign-in
  const handleSignedIn = (playerObj: any) => {
    setPlayer(playerObj);
    setScreen("home");
  };

  // Show AuthScreen if not signed in
  if (!player) {
    return (
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.dark, ...scannerTheme }}
        customMapping={customMapping}
      >
        <StatusBar style="light" />
        <AuthScreen theme={scannerTheme} onSignedIn={handleSignedIn} />
      </ApplicationProvider>
    );
  }

  // Main app UI after sign-in
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.dark, ...scannerTheme }}
        customMapping={customMapping}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: scannerTheme["color-dark"] }}>
          <StatusBar style="light" />
          <TopTabBar selectedScreen={screen} onTabSelect={setScreen} />
          <Layout style={{ flex: 1, backgroundColor: scannerTheme["color-dark"] }}>
            {screen === "home" && <HomeScreen />}
            {screen === "scan" && <ScanScreen />}
            {screen === "items" && <ItemsScreen />}
          </Layout>
        </SafeAreaView>
      </ApplicationProvider>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry, Layout } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import TopTabBar from "./src/components/TopTabBar";
import HomeScreen from "./src/screens/HomeScreen";
import ScanScreen from "./src/screens/ScanScreen";
import ItemsScreen from "./src/screens/ItemsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { Screen, Player } from "./src/types";
import scannerTheme from "./src/styling/theme.json";
import customMapping from "./src/styling/mapping.json";
import { StatusBar } from "expo-status-bar";
import { PlayerContext } from "./src/context/PlayerContext";
import { AuthGuard } from "./src/components/AuthGuard";

export default function App() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.dark, ...scannerTheme }}
        customMapping={customMapping}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: scannerTheme["color-dark"] }}>
          <AuthGuard>
            <StatusBar style="light" />
            <TopTabBar selectedScreen={screen} onTabSelect={setScreen} />
            <Layout style={{ flex: 1, backgroundColor: scannerTheme["color-dark"] }}>
              {screen === "home" && <HomeScreen />}
              {screen === "scan" && <ScanScreen />}
              {screen === "items" && <ItemsScreen />}
              {screen === "settings" && (
                <SettingsScreen
                  onSignedOut={() => {
                    setPlayer(null);
                    setScreen("home");
                  }}
                />
              )}
            </Layout>
          </AuthGuard>
        </SafeAreaView>
      </ApplicationProvider>
    </PlayerContext.Provider>
  );
}

import React, { useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import scannerTheme from "./src/styling/theme.json";
import customMapping from "./src/styling/mapping.json";
import { GameProvider } from "./src/context/GameContext";
import MainLayout from "./src/components/4-layouts/MainLayout";
import TopTabBar from "./src/components/TopTabBar";
import HomeScreen from "./src/components/5-screens/HomeScreen";
import ScanScreen from "./src/components/5-screens/ScanScreen";
import ItemsScreen from "./src/components/5-screens/ItemsScreen";
import SettingsScreen from "./src/components/5-screens/SettingsScreen";
import { AuthGuard } from "./src/components/AuthGuard";
import { LoadingScreen } from "./src/components/5-screens/LoadingScreen";
import { Screen } from "./src/types";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <GameProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.dark, ...scannerTheme }}
        customMapping={customMapping}
      >
        <MainLayout>
          <AuthGuard>
            {loading ? (
              <LoadingScreen onLoadComplete={() => setLoading(false)} />
            ) : (
              <>
                <TopTabBar selectedScreen={screen} onTabSelect={setScreen} />
                {screen === "home" && <HomeScreen />}
                {screen === "scan" && <ScanScreen />}
                {screen === "items" && <ItemsScreen />}
                {screen === "settings" && <SettingsScreen onSignedOut={() => setScreen("home")} />}
              </>
            )}
          </AuthGuard>
        </MainLayout>
      </ApplicationProvider>
    </GameProvider>
  );
}

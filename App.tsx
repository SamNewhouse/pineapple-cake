import React, { useState } from "react";
import MainLayout from "./src/components/4-layouts/MainLayout";
import TopTabBar from "./src/components/TopTabBar";
import HomeScreen from "./src/components/5-screens/HomeScreen";
import ScanScreen from "./src/components/5-screens/ScanScreen";
import ItemsScreen from "./src/components/5-screens/ItemsScreen";
import SettingsScreen from "./src/components/5-screens/SettingsScreen";
import { AuthGuard } from "./src/components/AuthGuard";
import { Screen } from "./src/types";
import AppProviders from "./src/components/4-layouts/AppProviders";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <AppProviders>
      <MainLayout>
        <AuthGuard>
          <TopTabBar selectedScreen={screen} onTabSelect={setScreen} />
          {screen === "home" && <HomeScreen />}
          {screen === "scan" && <ScanScreen />}
          {screen === "items" && <ItemsScreen />}
          {screen === "settings" && <SettingsScreen onSignedOut={() => setScreen("home")} />}
        </AuthGuard>
      </MainLayout>
    </AppProviders>
  );
}

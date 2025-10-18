import React, { useState } from "react";
import { AuthGuard } from "./src/presentation/4-layouts/AuthGuard";
import TopTabBar from "./src/presentation/2-molecules/TopTabBar";
import HomeScreen from "./src/presentation/5-screens/HomeScreen";
import ScanScreen from "./src/presentation/5-screens/ScanScreen";
import ItemsScreen from "./src/presentation/5-screens/ItemsScreen";
import SettingsScreen from "./src/presentation/5-screens/SettingsScreen";
import { Screen } from "./src/types";
import MainLayout from "./src/presentation/4-layouts/MainLayout";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <MainLayout>
      <AuthGuard>
        <TopTabBar selectedScreen={screen} onTabSelect={setScreen} />
        {screen === "home" && <HomeScreen />}
        {screen === "scan" && <ScanScreen />}
        {screen === "items" && <ItemsScreen />}
        {screen === "settings" && <SettingsScreen onSignedOut={() => setScreen("home")} />}
      </AuthGuard>
    </MainLayout>
  );
}

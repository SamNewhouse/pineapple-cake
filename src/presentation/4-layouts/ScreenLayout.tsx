import { AuthGuard } from "./AuthGuard";
import { Screen } from "../../types";
import ItemsScreen from "../5-screens/ItemsScreen";
import React, { useState } from "react";
import ScanScreen from "../5-screens/ScanScreen";
import SettingsScreen from "../5-screens/ProfileScreen";
import TopTabBar from "../2-molecules/TopTabBar";
import TradeScreen from "../5-screens/TradeScreen";

export default function ScreenLayout() {
  const [screen, setScreen] = useState<Screen>("items");
  return (
    <AuthGuard>
      <TopTabBar selectedScreen={screen} onTabSelect={setScreen} />
      {screen === "scan" && <ScanScreen />}
      {screen === "items" && <ItemsScreen />}
      {screen === "trade" && <TradeScreen />}
      {screen === "profile" && <SettingsScreen onSignedOut={() => setScreen("items")} />}
    </AuthGuard>
  );
}

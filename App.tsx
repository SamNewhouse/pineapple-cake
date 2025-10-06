import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry, Layout } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import TopTabBar from "./src/components/TopTabBar";
import HomeScreen from "./src/screens/HomeScreen";
import ScanScreen from "./src/screens/ScanScreen";
import InventoryScreen from "./src/screens/InventoryScreen";
import { Screen } from "./src/types";
import scannerTheme from "./src/styling/theme.json";
import customMapping from "./src/styling/mapping.json";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

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
            {screen === "inventory" && <InventoryScreen />}
          </Layout>
        </SafeAreaView>
      </ApplicationProvider>
    </>
  );
}

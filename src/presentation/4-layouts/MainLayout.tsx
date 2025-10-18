import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { GameProvider } from "../../context/GameContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <GameProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1D1D1D" }}>
        <StatusBar style="light" />
        <View style={{ flex: 1, backgroundColor: "#1D1D1D" }}>{children}</View>
      </SafeAreaView>
    </GameProvider>
  );
}

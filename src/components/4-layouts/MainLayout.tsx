import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import scannerTheme from "../../styling/theme.json";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: scannerTheme["color-dark"] }}>
      <StatusBar style="light" />
      <Layout style={{ flex: 1, backgroundColor: scannerTheme["color-dark"] }}>{children}</Layout>
    </SafeAreaView>
  );
}

import React from "react";
import { Layout, Text, useTheme } from "@ui-kitten/components";

export default function InventoryScreen() {
  const theme = useTheme();
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme["color-dark"],
      }}
    >
      <Text category="h1">INVENTORY</Text>
    </Layout>
  );
}

import React from "react";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { useRequiredPlayer } from "../../context/GameContext";

export default function HomeScreen() {
  const theme = useTheme();
  const { player } = useRequiredPlayer();

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme["color-dark"],
      }}
    >
      <Text category="h1" style={{ color: theme["color-text"], marginBottom: 12 }}>
        HOME SCREEN
      </Text>
      <Text style={{ color: theme["color-text"], fontSize: 18 }}>
        Welcome, <Text style={{ fontWeight: "bold" }}>{player.username}</Text>
      </Text>
    </Layout>
  );
}

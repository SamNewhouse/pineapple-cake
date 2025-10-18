import React from "react";
import { View, Text } from "react-native";
import { useRequiredPlayer } from "../../context/GameContext";

export default function HomeScreen() {
  const { player } = useRequiredPlayer();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1D1D1D",
      }}
    >
      <Text style={{ color: "#EBEBED", fontSize: 32, fontWeight: "800", marginBottom: 12 }}>
        HOME SCREEN
      </Text>
      <Text style={{ color: "#EBEBED", fontSize: 18 }}>
        Welcome, <Text style={{ fontWeight: "bold", color: "#EBEBED" }}>{player.username}</Text>
      </Text>
    </View>
  );
}

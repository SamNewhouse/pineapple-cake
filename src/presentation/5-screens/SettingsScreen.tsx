import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "../1-atoms/Button";
import { useGame, useRequiredPlayer } from "../../context/GameContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_STAGE } from "../../core/variables";

interface SettingsScreenProps {
  onSignedOut?: () => void;
}

export default function SettingsScreen({ onSignedOut }: SettingsScreenProps) {
  const { player, setPlayer } = useRequiredPlayer();
  const { collectables } = useGame();

  if (!player) return null;

  const devMode = ["test@test.com", "dev@example.com"].includes(player.email);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("player");
    setPlayer(null);
    console.log("Signed out - Player storage and context cleared!");
    if (onSignedOut) onSignedOut();
  };

  const handleClearStorage = async () => {
    await AsyncStorage.clear();
    setPlayer(null);
    console.log("Storage fully cleared!");
    if (onSignedOut) onSignedOut();
  };

  const diagnostics = [
    { label: "Username", value: player.username },
    { label: "Player ID", value: player.id },
    { label: "Email", value: player.email },
    { label: "Environment", value: EXPO_PUBLIC_STAGE },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#1D1D1D" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1D1D1D",
          padding: 24,
        }}
      >
        <Text
          style={{
            marginBottom: 20,
            color: "#EBEBED",
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          Settings
        </Text>
        <Text
          style={{
            marginBottom: 28,
            color: "#9D8751",
            fontSize: 16,
          }}
        >
          Review your account & app info
        </Text>
        <View style={{ width: "100%", marginBottom: 24 }}>
          {diagnostics.map((item) => (
            <View key={item.label} style={{ marginBottom: 10 }}>
              <Text style={{ color: "#6f6f6f", fontWeight: "600", fontSize: 14 }}>
                {item.label}:
              </Text>
              <Text style={{ color: "#EBEBED", fontSize: 16 }}>{item.value}</Text>
            </View>
          ))}
        </View>
        <Button onPress={handleSignOut} style={{ width: "100%", marginTop: 8 }}>
          Sign Out
        </Button>
        {devMode && (
          <>
            <Text
              style={{
                color: "#517F5F",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 36,
              }}
            >
              Dev Tools
            </Text>
            <Button onPress={handleClearStorage} style={{ width: "100%", marginTop: 12 }}>
              Clear Storage
            </Button>
            <Text style={{ marginTop: 24, color: "#EBEBED" }}>Collectables (context):</Text>
            {collectables.slice(0, 5).map((c) => (
              <View key={c.id} style={{ marginBottom: 8 }}>
                <Text style={{ color: "#517F5F", fontSize: 12 }}>
                  {c.id} - {c.name}
                </Text>
              </View>
            ))}
            <Text style={{ color: "#181A1B", fontSize: 10 }}>
              Showing {collectables.length} collectables
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

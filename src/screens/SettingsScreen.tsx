import React from "react";
import { ScrollView, View } from "react-native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { Button } from "../components/Button";
import { LocalStorage } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRequiredPlayer } from "../context/PlayerContext";

interface SettingsScreenProps {
  onSignedOut?: () => void;
}

export default function SettingsScreen({ onSignedOut }: SettingsScreenProps) {
  const theme = useTheme();
  const player = useRequiredPlayer();

  const devMode = !!player.email && ["test@test.com", "dev@example.com"].includes(player.email);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem(LocalStorage.PLAYER);
    console.log("Signed out - Player storage cleared!");
    if (onSignedOut) onSignedOut();
  };

  const handleClearStorage = async () => {
    await AsyncStorage.clear();
    console.log("Storage fully cleared!");
    if (onSignedOut) onSignedOut();
  };

  const diagnostics = [
    { label: "Username", value: player.username },
    { label: "Player ID", value: player.id },
    { label: "Email", value: player.email },
    { label: "Environment", value: process.env.STAGE },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme["color-dark"] }}>
      <Layout
        level="2"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme["color-dark"],
          padding: 24,
        }}
      >
        <Text
          category="h1"
          style={{
            marginBottom: 20,
            color: theme["color-text"],
            fontWeight: "bold",
          }}
        >
          Settings
        </Text>
        <Text
          appearance="hint"
          style={{
            marginBottom: 28,
            color: theme["color-warning"],
          }}
        >
          Review your account & app info
        </Text>
        <View style={{ width: "100%", marginBottom: 24 }}>
          {diagnostics.map((item) => (
            <View key={item.label} style={{ marginBottom: 10 }}>
              <Text style={{ color: theme["color-text-inactive"], fontWeight: "600" }}>
                {item.label}:
              </Text>
              <Text style={{ color: theme["color-text"], fontSize: 16 }}>{item.value}</Text>
            </View>
          ))}
        </View>
        <Button theme={theme} onPress={handleSignOut} style={{ width: "100%", marginTop: 8 }}>
          Sign Out
        </Button>
        {devMode && (
          <>
            <Text
              style={{
                color: theme["color-info-color"],
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 36,
              }}
            >
              Dev Tools
            </Text>
            <Button
              theme={theme}
              onPress={handleClearStorage}
              style={{ width: "100%", marginTop: 12 }}
            >
              Clear Storage
            </Button>
            {/* More dev/test controls here */}
          </>
        )}
      </Layout>
    </ScrollView>
  );
}

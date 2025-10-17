import React from "react";
import { ScrollView, View } from "react-native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { Button } from "../Button";
import { useGame, useRequiredPlayer } from "../../context/GameContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsScreenProps {
  onSignedOut?: () => void;
}

export default function SettingsScreen({ onSignedOut }: SettingsScreenProps) {
  const theme = useTheme();
  const { player, setPlayer } = useRequiredPlayer();
  const { collectables } = useGame();

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
            <Text style={{ marginTop: 24, color: theme["color-text"] }}>
              Collectables (context):
            </Text>
            {collectables.slice(0, 5).map((c) => (
              <View key={c.id} style={{ marginBottom: 8 }}>
                <Text style={{ color: theme["color-info-color"], fontSize: 12 }}>
                  {c.id} - {c.name}
                </Text>
              </View>
            ))}
            <Text style={{ color: theme["color-basic-600"], fontSize: 10 }}>
              Showing {collectables.length} collectables
            </Text>
          </>
        )}
      </Layout>
    </ScrollView>
  );
}

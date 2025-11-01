import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "../1-atoms/Button";
import { useRequiredPlayer } from "../../context/GameContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_STAGE } from "../../config/variables";
import { LocalStorage } from "../../types";
import { clearStorage } from "../../lib/storage";
import { PlayerIcon } from "../1-atoms/PlayerIcon";

interface SettingsScreenProps {
  onSignedOut?: () => void;
}

export default function ProfileScreen({ onSignedOut }: SettingsScreenProps) {
  const { player, setPlayer } = useRequiredPlayer();

  if (!player) return null;

  const devMode = player.permissions === 1;

  console.log(player);

  const handleSignOut = async () => {
    await clearStorage(LocalStorage.PLAYER);
    setPlayer(null);
    if (onSignedOut) onSignedOut();
  };

  const handleClearStorage = async () => {
    await AsyncStorage.clear();
    setPlayer(null);
    if (onSignedOut) onSignedOut();
  };

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
        <PlayerIcon player={player} />
        <View style={{ width: "100%", marginBottom: 24 }}></View>
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
          </>
        )}
      </View>
    </ScrollView>
  );
}

import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Button } from "../1-atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { PlayerIcon } from "../1-atoms/PlayerIcon";
import { setPlayer, clearPlayer } from "../../store/playerSlice";
import { clearItems } from "../../store/itemSlice";
import { clearCollectables } from "../../store/collectableSlice";
import { clearRarities } from "../../store/raritySlice";
import { clearHistory } from "../../store/scanSlice";
import { colors, font, spacing } from "../../config/theme";

interface SettingsScreenProps {
  onSignedOut?: () => void;
}

export default function ProfileScreen({ onSignedOut }: SettingsScreenProps) {
  const player = useSelector((state: RootState) => state.player.player);
  const dispatch = useDispatch<AppDispatch>();

  if (!player) return null;

  const devMode = player.permissions === 1;

  const handleSignOut = async () => {
    dispatch(clearPlayer());
    dispatch(clearItems());
    if (onSignedOut) onSignedOut();
  };

  const handleClearStorage = async () => {
    dispatch(clearPlayer());
    dispatch(clearItems());
    dispatch(clearCollectables());
    dispatch(clearRarities());
    dispatch(clearHistory());
    if (onSignedOut) onSignedOut();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
          padding: spacing.lg,
        }}
      >
        <PlayerIcon player={player} />
        <View style={{ width: "100%", marginBottom: spacing.lg }}></View>
        <Button onPress={handleSignOut} style={{ width: "100%", marginTop: spacing.sm }}>
          Sign Out
        </Button>
        {devMode && (
          <>
            <Text
              style={{
                color: colors.accent,
                fontWeight: "bold",
                fontSize: font.body,
                marginTop: spacing.xl,
              }}
            >
              Dev Tools
            </Text>
            <Button onPress={handleClearStorage} style={{ width: "100%", marginTop: spacing.md }}>
              Clear Storage
            </Button>
          </>
        )}
      </View>
    </ScrollView>
  );
}

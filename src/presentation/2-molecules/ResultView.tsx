import React from "react";
import { View, Text } from "react-native";
import { ScanResult } from "../../types";
import { Button } from "../1-atoms/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { hydrateItem } from "../../core/functions/items";
import { colors, font, spacing } from "../../config/theme";

export function ResultView({ result, resetScan }: { result: ScanResult; resetScan: () => void }) {
  const collectables = useSelector((state: RootState) => state.collectables.collectables);
  const rarities = useSelector((state: RootState) => state.rarities.rarities);
  const { success, message, awardedItem } = result;

  if (!success) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text
          style={{
            color: colors.accent,
            fontWeight: font.weightBold,
            textAlign: "center",
            fontSize: font.h1,
            marginBottom: spacing.lg,
          }}
        >
          {message}
        </Text>
        <Button
          onPress={resetScan}
          style={{
            backgroundColor: colors.card,
            borderColor: colors.background,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.lg,
            marginVertical: "5%",
          }}
        >
          Try Again
        </Button>
      </View>
    );
  }

  const hydrated = hydrateItem(awardedItem!, collectables, rarities);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1D1D1D",
      }}
    >
      <Text
        style={{
          color: "#EBEBED",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 28,
          marginBottom: 20,
        }}
      >
        {hydrated.collectable.name}
      </Text>
      <Text
        style={{
          color: hydrated.rarity.color,
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        {hydrated.rarity.name.toUpperCase()}
      </Text>
      <Text
        style={{
          color: "#9D8751",
          textAlign: "center",
          fontSize: 14,
          marginBottom: 20,
        }}
      >
        Rarity: {Math.round(hydrated.rarity.minChance * 100)}% -{" "}
        {Math.round(hydrated.rarity.maxChance * 100)}%
      </Text>
      <Button onPress={resetScan}>Scan Another</Button>
    </View>
  );
}

import React from "react";
import { View, Text } from "react-native";
import { ScanResult } from "../../types";
import { Button } from "../1-atoms/Button";
import { useStaticData } from "../../context/StaticDataContext";
import { hydrateItem } from "../../core/functions/items";

export function ResultView({ result, resetScan }: { result: ScanResult; resetScan: () => void }) {
  const { collectables, rarities } = useStaticData();
  const { success, message, awardedItem } = result;

  if (!success) {
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
            color: "#7B4141",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 28,
            marginBottom: 20,
          }}
        >
          {message}
        </Text>
        <Button
          onPress={resetScan}
          style={{
            backgroundColor: "#171717",
            borderColor: "#1D1D1D",
            paddingHorizontal: 20,
            paddingVertical: 20,
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
      <Button
        onPress={resetScan}
        style={{
          backgroundColor: "#171717",
          borderColor: "#1D1D1D",
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginVertical: "5%",
        }}
      >
        Scan Another
      </Button>
    </View>
  );
}

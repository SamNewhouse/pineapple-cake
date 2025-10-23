import React from "react";
import { View, Text } from "react-native";
import { ScanResult } from "../../types";
import { Button } from "../1-atoms/Button";
import { useStaticData } from "../../context/StaticDataContext";
import { hydrateItem } from "../../core/functions/items";

interface ResultViewProps {
  result: ScanResult;
  resetScan: () => void;
}

export function ResultView({ result, resetScan }: ResultViewProps) {
  const { collectables, rarities } = useStaticData();

  // Hydrate the awarded item (if present)
  const hydrated = result.awardedItem
    ? hydrateItem(result.awardedItem, collectables, rarities)
    : null;

  if (result.error) {
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
            marginBottom: 20,
            color: "#7B4141",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 28,
          }}
        >
          Scan Failed
        </Text>
        <Text
          style={{
            marginBottom: 20,
            color: "#9D8751",
            textAlign: "center",
            paddingHorizontal: 20,
            fontSize: 14,
          }}
        >
          {result.error.message || "Something went wrong"}
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

  // Fallback if hydration fails, but with your patterns this should be rare!
  if (!hydrated) {
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
            marginBottom: 20,
            color: "#EBEBED",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 28,
          }}
        >
          Item Unknown
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

  // Use hydrated.collectable and hydrated.rarity here!
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
          marginBottom: 20,
          color: "#EBEBED",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 28,
        }}
      >
        {hydrated.collectable.name}
      </Text>
      <Text
        style={{
          marginBottom: 10,
          color: hydrated.rarity.color,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {hydrated.rarity.name.toUpperCase()}
      </Text>
      {/* Display chance range if desired */}
      <Text
        style={{
          marginBottom: 20,
          color: "#9D8751",
          textAlign: "center",
          fontSize: 14,
        }}
      >
        Rarity: {Math.round(hydrated.rarity.minChance * 100)}% -{" "}
        {Math.round(hydrated.rarity.maxChance * 100)}%
      </Text>
      {hydrated.itemLike.createdAt && (
        <Text
          style={{
            marginBottom: 20,
            color: "#5A5D61",
            fontSize: 12,
          }}
        >
          Found: {new Date(hydrated.itemLike.createdAt).toLocaleDateString()}
        </Text>
      )}
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

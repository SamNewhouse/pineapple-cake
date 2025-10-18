import React from "react";
import { View, Text } from "react-native";
import { ScanResult } from "../../types";
import { Button } from "../1-atoms/Button";

interface ResultViewProps {
  result: ScanResult;
  resetScan: () => void;
}

export function ResultView({ result, resetScan }: ResultViewProps) {
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
          {result.error?.message || "Something went wrong"}
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
        {result.awardedItem?.name ?? "Item Unknown"}
      </Text>

      {result.awardedItem?.rarity && (
        <Text
          style={{
            marginBottom: 10,
            color: result.awardedItem.rarityColor || "#9D8751",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {result.awardedItem.rarity.toUpperCase()}
        </Text>
      )}

      {result.awardedItem?.rarityMinChance && result.awardedItem?.rarityMaxChance && (
        <Text
          style={{
            marginBottom: 20,
            color: "#9D8751",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          Rarity: {Math.round(result.awardedItem.rarityMinChance * 100)}% -{" "}
          {Math.round(result.awardedItem.rarityMaxChance * 100)}%
        </Text>
      )}

      {result.foundAt && (
        <Text
          style={{
            marginBottom: 20,
            color: "#5A5D61",
            fontSize: 12,
          }}
        >
          Found: {new Date(result.foundAt).toLocaleDateString()}
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

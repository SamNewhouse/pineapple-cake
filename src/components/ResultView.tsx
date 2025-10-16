import React from "react";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";
import { ScanResult } from "../types";

interface ResultViewProps {
  result: ScanResult;
  resetScan: () => void;
}

export function ResultView({ result, resetScan }: ResultViewProps) {
  const theme = useTheme();

  // Handle error case
  if (result.error) {
    return (
      <Layout
        level="2"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme["color-dark"],
        }}
      >
        <Text
          category="h2"
          style={{
            marginBottom: 20,
            color: theme["color-danger"],
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Scan Failed
        </Text>
        <Text
          appearance="hint"
          style={{
            marginBottom: 20,
            color: theme["color-warning"],
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          {result.error?.message || "Something went wrong"}
        </Text>
        <Button
          status="primary"
          onPress={resetScan}
          style={{
            backgroundColor: theme["color-darkest"],
            borderColor: theme["color-dark"],
            paddingHorizontal: 20,
            paddingVertical: 20,
            marginVertical: "5%",
          }}
          appearance="filled"
        >
          Try Again
        </Button>
      </Layout>
    );
  }

  // Handle success case
  return (
    <Layout
      level="2"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme["color-dark"],
      }}
    >
      <Text
        category="h2"
        style={{
          marginBottom: 20,
          color: theme["color-text"],
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {result.awardedItem?.name ?? "Item Unknown"}
      </Text>

      {result.awardedItem?.rarity && (
        <Text
          category="h4"
          style={{
            marginBottom: 10,
            color: result.awardedItem.rarityColor || theme["color-warning"],
            fontWeight: "bold",
          }}
        >
          {result.awardedItem.rarity.toUpperCase()}
        </Text>
      )}

      {result.awardedItem?.rarityMinChance && result.awardedItem?.rarityMaxChance && (
        <Text
          appearance="hint"
          style={{
            marginBottom: 20,
            color: theme["color-warning"],
            textAlign: "center",
          }}
        >
          Rarity: {Math.round(result.awardedItem.rarityMinChance * 100)}% -{" "}
          {Math.round(result.awardedItem.rarityMaxChance * 100)}%
        </Text>
      )}

      {result.foundAt && (
        <Text
          appearance="hint"
          style={{
            marginBottom: 20,
            color: theme["color-hint"],
            fontSize: 12,
          }}
        >
          Found: {new Date(result.foundAt).toLocaleDateString()}
        </Text>
      )}

      <Button
        status="primary"
        onPress={resetScan}
        style={{
          backgroundColor: theme["color-darkest"],
          borderColor: theme["color-dark"],
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginVertical: "5%",
        }}
        appearance="filled"
      >
        Scan Another
      </Button>
    </Layout>
  );
}

import React from "react";
import { Layout, Text, Button } from "@ui-kitten/components";

interface AwardedItem {
  name?: string;
  rarityChance?: number;
}

interface Result {
  awardedItem?: AwardedItem;
}

export interface ResultViewProps {
  theme: { [key: string]: string };
  result: Result;
  resetScan: () => void;
}

export function ResultView({ theme, result, resetScan }: ResultViewProps) {
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
        }}
      >
        {result.awardedItem?.name ?? "Item Unknown"}
      </Text>
      <Text
        appearance="hint"
        style={{
          marginBottom: 20,
          color: theme["color-warning"],
        }}
      >
        Rarity Chance: {Math.round((result.awardedItem?.rarityChance ?? 0) * 100)}%
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
        Scan Another
      </Button>
    </Layout>
  );
}

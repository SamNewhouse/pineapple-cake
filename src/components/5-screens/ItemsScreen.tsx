import React, { useMemo } from "react";
import { Layout, useTheme } from "@ui-kitten/components";
import { ItemsList } from "../ItemsList";
import { Loading } from "../Loading";
import { useGame } from "../../context/GameContext";

export default function ItemsScreen() {
  const theme = useTheme();
  const { items, collectables } = useGame();

  // Build a Map<string, Collectable> as ItemsList expects a Map.
  const collectablesMap = useMemo(
    () => new Map((collectables || []).map((col) => [col.id, col])),
    [collectables],
  );

  if (!items || !items.length) return <Loading message="Loading your items..." />;

  return (
    <Layout
      level="2"
      style={{
        flex: 1,
        backgroundColor: theme["color-dark"],
      }}
    >
      <ItemsList
        items={items}
        collectables={collectablesMap}
        onItemPress={() => {}}
        refreshing={false}
        onRefresh={() => {}}
      />
    </Layout>
  );
}

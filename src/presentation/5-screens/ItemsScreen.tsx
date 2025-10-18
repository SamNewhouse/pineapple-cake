import React, { useMemo } from "react";
import { View } from "react-native";
import { useGame } from "../../context/GameContext";
import { ItemsList } from "../2-molecules/ItemsList";

export default function ItemsScreen() {
  const { items, collectables } = useGame();

  const collectablesMap = useMemo(
    () => new Map((collectables || []).map((col) => [col.id, col])),
    [collectables],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1D1D1D",
      }}
    >
      <ItemsList
        items={items}
        collectables={collectablesMap}
        onItemPress={() => {}}
        refreshing={false}
        onRefresh={() => {}}
      />
    </View>
  );
}

import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, RefreshControl } from "react-native";
import { ItemCard } from "../2-molecules/ItemCard";
import { HydratedItem } from "../../types";
import { log } from "../../lib/logging";
import { waitRandomDelay } from "../../utils/time";

interface ItemsListProps {
  hydratedItems: HydratedItem[];
  refreshing?: boolean;
  onRefresh?: () => void;
  onItemPress: (item: HydratedItem) => void;
}

export const ItemsList: React.FC<ItemsListProps> = ({
  hydratedItems,
  refreshing,
  onRefresh,
  onItemPress,
}) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function revealItems() {
      setVisibleCount(0);
      for (let i = 1; i <= hydratedItems.length; i++) {
        if (cancelled) break;
        await waitRandomDelay(66, 666);
        setVisibleCount(i);
      }
    }

    revealItems();

    return () => {
      cancelled = true;
    };
  }, [hydratedItems]);

  const renderEmpty = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 60 }}>
      <Text style={{ marginBottom: 20, color: "#EBEBED", fontWeight: "bold", fontSize: 28 }}>
        No Items Found
      </Text>
      <Text style={{ color: "#9D8751", textAlign: "center", paddingHorizontal: 40, fontSize: 14 }}>
        Start scanning to collect items!
      </Text>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: "#1D1D1D" }}
      refreshControl={
        onRefresh && refreshing !== undefined ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      style={{ padding: 8 }}
    >
      {hydratedItems.length === 0
        ? renderEmpty()
        : hydratedItems.slice(0, visibleCount).map((item) => (
            <TouchableOpacity
              key={item.item.id}
              activeOpacity={0.7}
              onPress={() => {
                console.log("List item pressed:", item.item.id);
                onItemPress(item);
              }}
            >
              <ItemCard hydratedItem={item} />
            </TouchableOpacity>
          ))}
    </ScrollView>
  );
};

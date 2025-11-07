import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, RefreshControl } from "react-native";
import { ItemCard } from "../2-molecules/ItemCard";
import { HydratedItem } from "../../types";
import { waitRandomDelay } from "../../utils/time";
import { colors, font, spacing } from "../../config/theme";

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
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    let cancelled = false;

    async function revealItems() {
      for (let i = visibleCount + 1; i <= hydratedItems.length; i++) {
        if (cancelled) break;
        await waitRandomDelay(34, 346);
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
      <Text
        style={{
          marginBottom: spacing.md,
          color: colors.text,
          fontWeight: font.weightBold,
          fontSize: font.h1,
        }}
      >
        No Items Found
      </Text>
      <Text
        style={{
          color: colors.accent,
          textAlign: "center",
          paddingHorizontal: spacing.xl,
          fontSize: font.small,
        }}
      >
        Start scanning to collect items!
      </Text>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: colors.background }}
      refreshControl={
        onRefresh && refreshing !== undefined ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      style={{ padding: spacing.sm }}
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

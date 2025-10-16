import React from "react";
import { FlatList, View } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import { Item, Collectable } from "../types";
import { ItemCard } from "./ItemCard";

interface ItemsListProps {
  items: Item[];
  collectables: Map<string, Collectable>;
  onItemPress?: (item: Item, ItemCatalog?: Collectable) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const ItemsList: React.FC<ItemsListProps> = ({
  items,
  collectables,
  onItemPress,
  refreshing,
  onRefresh,
}) => {
  const theme = useTheme();

  const renderItem = ({ item }: { item: Item }) => {
    const ItemCatalog = collectables.get(item.id);
    return (
      <ItemCard
        item={item}
        ItemCatalog={ItemCatalog}
        onPress={() => onItemPress?.(item, ItemCatalog)}
      />
    );
  };

  const renderEmpty = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 60,
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
        No Items Found
      </Text>
      <Text
        appearance="hint"
        style={{
          color: theme["color-warning"],
          textAlign: "center",
          paddingHorizontal: 40,
        }}
      >
        Start scanning to collect items!
      </Text>
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      ListEmptyComponent={renderEmpty}
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{
        backgroundColor: theme["color-dark"],
      }}
      contentContainerStyle={items.length === 0 ? { flex: 1 } : { padding: 8 }}
    />
  );
};

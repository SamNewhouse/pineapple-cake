import React from "react";
import { FlatList, View, Text } from "react-native";
import { ItemCard } from "../1-atoms/ItemCard";
import { Item, Collectable, HydratedItem } from "../../types";

interface ItemsListProps {
  hydratedItems: HydratedItem[];
  onItemPress?: (item: Item, collectable?: Collectable) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const ItemsList: React.FC<ItemsListProps> = ({
  hydratedItems,
  onItemPress,
  refreshing,
  onRefresh,
}) => {
  const renderItem = ({ item }: { item: HydratedItem }) => (
    <ItemCard
      item={item.item}
      collectable={item.collectable}
      rarity={item.rarity}
      onPress={() => onItemPress?.(item.item, item.collectable)}
    />
  );

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
    <FlatList
      data={hydratedItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.item.id}
      numColumns={3}
      columnWrapperStyle={{ gap: 6, marginBottom: 6 }}
      contentContainerStyle={{ paddingVertical: 4 }}
      ListEmptyComponent={renderEmpty}
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{ backgroundColor: "#1D1D1D", padding: 6 }}
    />
  );
};

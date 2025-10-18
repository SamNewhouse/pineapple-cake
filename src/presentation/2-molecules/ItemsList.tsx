import React from "react";
import { FlatList, View, Text, Dimensions } from "react-native";
import { Item, Collectable } from "../../types";
import { ItemCard } from "../1-atoms/ItemCard";

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
  const renderItem = ({ item }: { item: Item }) => {
    const collectable = collectables.get(item.collectableId);
    return (
      <ItemCard
        item={item}
        collectable={collectable}
        onPress={() => onItemPress?.(item, collectable)}
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
        style={{
          marginBottom: 20,
          color: "#EBEBED",
          fontWeight: "bold",
          fontSize: 28,
        }}
      >
        No Items Found
      </Text>
      <Text
        style={{
          color: "#9D8751",
          textAlign: "center",
          paddingHorizontal: 40,
          fontSize: 14,
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
      initialNumToRender={6}
      columnWrapperStyle={{ gap: 8, marginBottom: 8 }}
      contentContainerStyle={{ paddingVertical: 8 }}
      ListEmptyComponent={renderEmpty}
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{
        backgroundColor: "#1D1D1D",
        padding: 8,
      }}
    />
  );
};

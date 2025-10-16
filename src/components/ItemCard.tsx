import React from "react";
import { Card, Text, useTheme } from "@ui-kitten/components";
import { View, TouchableOpacity } from "react-native";
import { Item, Collectable } from "../types";

interface ItemCardProps {
  item: Item;
  ItemCatalog?: Collectable;
  onPress?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, ItemCatalog, onPress }) => {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, margin: 5, maxWidth: "50%" }}>
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <Card
          style={{
            flex: 1,
            backgroundColor: theme["color-dark"],
            borderWidth: 1,
            borderColor: ItemCatalog?.rarityColor || theme["color-darkest"],
          }}
        >
          <View
            style={{
              alignItems: "center",
              padding: 12,
              minHeight: 100,
            }}
          >
            <Text
              category="h6"
              style={{
                color: theme["color-text"],
                fontWeight: "bold",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              {ItemCatalog?.name || `Item ${item.collectableId.slice(-6)}`}
            </Text>

            {ItemCatalog?.rarity && (
              <Text
                category="c1"
                style={{
                  color: ItemCatalog.rarityColor,
                  fontWeight: "bold",
                  fontSize: 10,
                  marginBottom: 4,
                }}
              >
                {ItemCatalog.rarity.toUpperCase()}
              </Text>
            )}

            <Text
              appearance="hint"
              style={{
                color: theme["color-warning"],
                fontSize: 11,
                textAlign: "center",
              }}
            >
              {new Date(item.foundAt).toLocaleDateString()}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

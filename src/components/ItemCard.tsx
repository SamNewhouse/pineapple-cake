import React from "react";
import { Card, Text, useTheme } from "@ui-kitten/components";
import { View, Image, TouchableOpacity } from "react-native";
import { Item, Collectable } from "../types";

interface ItemCardProps {
  item: Item;
  collectable?: Collectable;
  onPress?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, collectable, onPress }) => {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, margin: 5 }}>
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <Card
          style={{
            flex: 1,
            backgroundColor: theme["color-dark"],
            borderWidth: 1,
            borderColor: theme["color-darkest"],
          }}
        >
          <View
            style={{
              alignItems: "center",
              padding: 12,
              minHeight: 100,
            }}
          >
            {collectable?.imageUrl && (
              <Image
                source={{ uri: collectable.imageUrl }}
                style={{ width: 56, height: 56, borderRadius: 7, marginBottom: 10 }}
                resizeMode="contain"
              />
            )}

            <Text>{collectable?.name || "Unknown Collectable"}</Text>
            <Text>{collectable?.description}</Text>

            {/* Rarity display */}
            {collectable?.rarity && (
              <Text
                category="c1"
                style={{
                  color: collectable.rarityColor,
                  fontWeight: "bold",
                  fontSize: 10,
                  marginBottom: 4,
                }}
              >
                {collectable.rarity.toUpperCase()}
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

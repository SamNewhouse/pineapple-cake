import React, { useEffect, useMemo, useRef } from "react";
import { View, TouchableOpacity, Text, Image, Animated } from "react-native";
import { HydratedItem } from "../../types";
import { colorLuminance } from "../../utils/colors";
import { Container } from "../1-atoms/Container";
import { ItemImage } from "../1-atoms/ItemImage";
import { formatChanceToPercent } from "../../utils/numbers";

interface ItemCardProps {
  hydratedItem: HydratedItem;
  onPress?: () => void;
}

const itemImages = [
  require("../../assets/items/pikamelon.png"),
  require("../../assets/items/toy.png"),
  require("../../assets/items/cat.png"),
  require("../../assets/items/rainbow-pig.png"),
  require("../../assets/items/flower.png"),
];

export const ItemCard: React.FC<ItemCardProps> = ({ hydratedItem, onPress }) => {
  const { item, collectable, rarity } = hydratedItem;

  const randomImage = useMemo(() => {
    return itemImages[Math.floor(Math.random() * itemImages.length)];
  }, [item.id]);

  const resolvedImageUri = Image.resolveAssetSource(randomImage).uri;

  useEffect(() => {
    Image.prefetch(resolvedImageUri);
  }, [resolvedImageUri]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        marginBottom: 8,
        width: "100%",
        backgroundColor: "#111111",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <Container style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 6,
            height: "100%",
            backgroundColor: rarity.color,
          }}
        />
        <Container
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            justifyContent: "flex-start",
          }}
        >
          <Container
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
              minHeight: 64,
              minWidth: 64,
            }}
          >
            <ItemImage imageUrl={resolvedImageUri} />
          </Container>

          <Container>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: "#EBEBED",
                marginBottom: 2,
              }}
            >
              {collectable.name}
            </Text>
            <Container
              style={{
                flexDirection: "row",
                marginTop: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "900",
                  letterSpacing: 1,
                  marginRight: 14,
                  color: colorLuminance(rarity.color, 0.5),
                }}
              >
                {rarity.name.toUpperCase()}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#FFFFFFAA",
                }}
              >
                {formatChanceToPercent(item.chance)}%
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </TouchableOpacity>
  );
};

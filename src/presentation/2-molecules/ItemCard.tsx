import React, { useEffect, useMemo, useRef } from "react";
import { View, TouchableOpacity, Text, Image, Animated } from "react-native";
import { HydratedItem } from "../../types";
import { colorLuminance } from "../../utils/colors";
import { Container } from "../1-atoms/Container";
import { ItemImage } from "../1-atoms/ItemImage";
import { formatChanceToPercent } from "../../utils/numbers";
import { borderRadius, colors, font, spacing } from "../../config/theme";

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

  // TODO: __DEV__ randomImage, if PROD use collectable.imageId which will reference local file.

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
        marginBottom: spacing.sm,
        width: "100%",
        backgroundColor: colors.card,
        borderRadius: borderRadius.sm,
        overflow: "hidden",
      }}
    >
      <Container style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: spacing.xs,
            height: "100%",
            backgroundColor: rarity.color,
          }}
        />
        <Container
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: spacing.md,
            justifyContent: "flex-start",
          }}
        >
          <Container
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginRight: spacing.md,
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
                fontSize: font.h3,
                fontWeight: font.weightBold,
                color: colors.text,
                marginBottom: spacing.xs,
              }}
            >
              {collectable.name}
            </Text>
            <Container
              style={{
                flexDirection: "row",
                marginTop: spacing.xs,
              }}
            >
              <Text
                style={{
                  fontSize: font.small,
                  fontWeight: font.weightBold,
                  letterSpacing: 1,
                  marginRight: spacing.md,
                  color: colorLuminance(rarity.color, 0.5),
                }}
              >
                {rarity.name.toUpperCase()}
              </Text>
              <Text
                style={{
                  fontSize: font.small,
                  fontWeight: font.weightBold,
                  color: colors.textMuted,
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

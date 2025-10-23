import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, TouchableOpacity, Text, Dimensions } from "react-native";
import { Item, Collectable, Rarity } from "../../types";
import { LinearGradient } from "expo-linear-gradient";

interface ItemCardProps {
  item: Item;
  collectable: Collectable;
  rarity: Rarity;
  onPress?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, collectable, rarity, onPress }) => {
  const screenWidth = Dimensions.get("window").width;
  const [loading, setLoading] = useState(!!collectable.imageUrl);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoading(!!collectable.imageUrl);
    setLoadFailed(false);
  }, [collectable.imageUrl]);

  useEffect(() => {
    if (loading && collectable.imageUrl && !loadFailed) {
      const timer = setTimeout(() => {
        setLoading(false);
        setLoadFailed(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loading, collectable.imageUrl, loadFailed]);

  const percent = item.chance * 100;
  const itemChanceModifier =
    percent === 0 ? "0.00" : percent < 1 ? percent.toFixed(8) : percent.toFixed(2);

  return (
    <View style={{ width: screenWidth / 2 - 12 }}>
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#1D1D1D",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.075)",
            borderRadius: 3,
          }}
        >
          <LinearGradient
            colors={[rarity.color, "#101010"]}
            locations={[0, 0.6]}
            start={{ x: 0.2, y: 0.07 }}
            end={{ x: 0.8, y: 0.93 }}
            style={{
              flex: 1,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                alignItems: "center",
                padding: 16,
                minHeight: 100,
              }}
            >
              <Text
                numberOfLines={1}
                style={{ color: "#EBEBED", fontWeight: "bold", fontSize: 16, marginBottom: 5 }}
              >
                {collectable.name}
              </Text>

              <View
                style={{
                  marginBottom: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <ActivityIndicator size="large" color="#EBEBED" style={{ height: 76 }} />
                ) : (
                  <Image
                    source={
                      !loadFailed && collectable.imageUrl
                        ? { uri: collectable.imageUrl }
                        : require("../../assets/items/sword.png")
                    }
                    style={{ width: 76, height: 76, borderRadius: 3 }}
                    resizeMode="contain"
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    onError={() => {
                      setLoading(false);
                      setLoadFailed(true);
                    }}
                  />
                )}
              </View>

              <Text
                style={{
                  color: "#6DD3B3",
                  fontSize: 12,
                  marginBottom: 3,
                  fontWeight: "bold",
                }}
              >
                {itemChanceModifier}%
              </Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <Text
                  style={{
                    color: rarity.color,
                    fontWeight: "bold",
                    fontSize: 10,
                    marginBottom: 4,
                    textTransform: "uppercase",
                  }}
                >
                  {rarity.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    color: "#9D8751",
                    fontSize: 11,
                    textAlign: "center",
                  }}
                >
                  {new Date(item.foundAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
};

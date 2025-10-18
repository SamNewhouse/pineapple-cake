import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, TouchableOpacity, Text, Dimensions } from "react-native";
import { Item, Collectable } from "../../types";
import { LinearGradient } from "expo-linear-gradient";

interface ItemCardProps {
  item: Item;
  collectable?: Collectable;
  onPress?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, collectable, onPress }) => {
  const screenWidth = Dimensions.get("window").width;
  const [loading, setLoading] = useState(!!collectable?.imageUrl);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (loading && collectable?.imageUrl && !loadFailed) {
      const timer = setTimeout(() => {
        setLoading(false);
        setLoadFailed(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loading, collectable?.imageUrl, loadFailed]);

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
            colors={[collectable!.rarityColor, "#1D1D1D", "#000000"]}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.9 }}
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
              <Text style={{ color: "#EBEBED", fontWeight: "bold", fontSize: 18, marginBottom: 5 }}>
                {collectable?.name || "Unknown Collectable"}
              </Text>

              <View
                style={{
                  marginBottom: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#EBEBED" />
                ) : (
                  <Image
                    source={
                      !loadFailed && collectable?.imageUrl
                        ? { uri: collectable.imageUrl }
                        : require("../../assets/items/sword.png")
                    }
                    style={{ width: 84, height: 84, borderRadius: 7 }}
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
                Drop Chance: {(collectable!.rarityChance * 100).toFixed(2)}%
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
                    color: collectable!.rarityColor,
                    fontWeight: "bold",
                    fontSize: 10,
                    marginBottom: 4,
                    textTransform: "uppercase",
                  }}
                >
                  {collectable!.rarity.toUpperCase()}
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

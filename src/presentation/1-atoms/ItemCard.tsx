import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Dimensions,
  TextStyle,
  ImageBackground,
  Animated,
} from "react-native";
import { Item, Collectable, Rarity } from "../../types";
import { LinearGradient } from "expo-linear-gradient";
import { colorLuminance } from "../../utils/colors";

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
    if (!collectable.imageUrl) {
      setLoading(false);
      setLoadFailed(true);
      return;
    }

    let timer: NodeJS.Timeout;
    setLoading(true);
    setLoadFailed(false);

    timer = setTimeout(() => {
      setLoading(false);
      setLoadFailed(true);
    }, 5000);

    return () => {
      clearTimeout(timer); // clean up on changes/unmount
    };
  }, [collectable.imageUrl]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const percent = item.chance * 100;
  const itemChanceModifier =
    percent === 0 ? "0.00" : percent < 1 ? percent.toFixed(8) : percent.toFixed(2);

  const textStyle: TextStyle = {
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  };

  const itemImages = [
    require("../../assets/items/pikamelon.png"),
    require("../../assets/items/toy.png"),
    require("../../assets/items/cat.png"),
    require("../../assets/items/rainbow-pig.png"),
    require("../../assets/items/flower.png"),
  ];

  const randomImage = itemImages[Math.floor(Math.random() * itemImages.length)];
  const backgroundImageUri = Image.resolveAssetSource(randomImage).uri;

  Image.prefetch(backgroundImageUri);

  return (
    <View style={{ width: screenWidth / 3 - 9 }}>
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <LinearGradient
          colors={[colorLuminance(rarity.color, -0.6), colorLuminance(rarity.color, 0.3)]}
          locations={[0, 0.6]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            flex: 1,
            padding: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: rarity.color,
            }}
          >
            <View
              style={{
                alignItems: "center",
                padding: 6,
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.24)",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <Animated.View
                  style={{
                    position: "absolute",
                    width: "200%",
                    height: "200%",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: fadeAnim,
                  }}
                >
                  <ImageBackground
                    source={{ uri: backgroundImageUri }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0.08,
                    }}
                    resizeMode="cover"
                  />
                </Animated.View>
              </View>

              {/* HEADER */}
              <Text
                numberOfLines={1}
                style={{
                  color: "#EBEBED",
                  fontWeight: "bold",
                  fontSize: 13,
                  marginBottom: 4,
                  textAlign: "center",
                }}
              >
                {collectable.name}
              </Text>

              {/* IMAGE */}
              <View
                style={{
                  marginBottom: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <ActivityIndicator size="large" color="#EBEBED" style={{ height: 60 }} />
                ) : (
                  <Image
                    source={
                      !loadFailed && collectable.imageUrl
                        ? { uri: collectable.imageUrl }
                        : randomImage
                    }
                    style={{ width: 60, height: 60 }}
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

              {/* INFO */}
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text
                  style={[
                    {
                      color: "#ffffff",
                      marginBottom: 0,
                      fontSize: 12,
                    },
                    textStyle,
                  ]}
                >
                  {itemChanceModifier}%
                </Text>

                <Text
                  style={[
                    {
                      color: colorLuminance(rarity.color, 0.5),
                      fontSize: 12,
                    },
                    textStyle,
                  ]}
                >
                  {rarity.name.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

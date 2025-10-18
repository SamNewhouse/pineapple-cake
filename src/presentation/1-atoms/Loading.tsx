import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

interface LoadingProps {
  message?: string;
  size?: "tiny" | "small" | "medium" | "large" | "giant";
}

const indicatorSizeMap: { [key in Required<LoadingProps>["size"]]: number } = {
  tiny: 16,
  small: 24,
  medium: 36,
  large: 48,
  giant: 64,
};

export const Loading: React.FC<LoadingProps> = ({ message = "Loading...", size = "large" }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1D1D1D",
      }}
    >
      <ActivityIndicator
        size={indicatorSizeMap[size ?? "large"]}
        color="#EBEBED"
        style={{
          marginBottom: 12,
        }}
      />
      <Text
        style={{
          color: "#EBEBED",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
        }}
      >
        {message}
      </Text>
    </View>
  );
};

import React from "react";
import { View } from "react-native";

export function Centered({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1D1D1D",
      }}
    >
      {children}
    </View>
  );
}

Centered.displayName = "Centered";

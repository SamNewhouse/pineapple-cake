import React from "react";
import { ScrollView, View, Text } from "react-native";

export default function TradeScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#1D1D1D" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Text
          style={{
            marginBottom: 20,
            color: "#EBEBED",
            fontWeight: "bold",
            fontSize: 32,
          }}
        >
          Trade
        </Text>
      </View>
    </ScrollView>
  );
}

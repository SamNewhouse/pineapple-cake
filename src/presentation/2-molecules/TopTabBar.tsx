import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Screen } from "../../types";

const tabLabels: Screen[] = ["home", "scan", "items", "trade", "settings"];

export default function TopTabBar({
  selectedScreen,
  onTabSelect,
}: {
  selectedScreen: Screen;
  onTabSelect: (screen: Screen) => void;
}) {
  const selectedIndex = tabLabels.indexOf(selectedScreen);

  return (
    <View style={styles.bar}>
      {tabLabels.map((label, i) => (
        <TouchableOpacity
          key={label}
          style={[styles.tab, i === selectedIndex && styles.selectedTab]}
          onPress={() => onTabSelect(tabLabels[i])}
        >
          <Text style={[styles.tabText, i === selectedIndex && styles.selectedText]}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: "#1D1D1D",
    paddingVertical: 0,
    justifyContent: "space-around",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  selectedTab: {
    backgroundColor: "#171717",
    borderRadius: 2,
  },
  tabText: {
    color: "#6f6f6f",
    fontSize: 16,
    fontWeight: "700",
  },
  selectedText: {
    color: "#EBEBED",
  },
});

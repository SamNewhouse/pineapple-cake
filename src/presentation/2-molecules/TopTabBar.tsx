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
    <View style={styles.topBar}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {},
  bar: {
    flexDirection: "row",
    paddingVertical: 0,
    justifyContent: "space-around",
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  selectedTab: {
    backgroundColor: "#171717",
    borderRadius: 0,
  },
  tabText: {
    color: "#6f6f6f",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedText: {
    color: "#EBEBED",
  },
});

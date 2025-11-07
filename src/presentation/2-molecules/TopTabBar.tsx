import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Screen } from "../../types";
import { colors, font, spacing } from "../../config/theme";

const tabLabels: Screen[] = ["scan", "items", "trade", "profile"];

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
    paddingVertical: spacing.md,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  selectedTab: {
    backgroundColor: colors.card,
    borderRadius: 0,
  },
  tabText: {
    color: colors.textMuted,
    fontSize: font.body,
    fontWeight: font.weightBold,
  },
  selectedText: {
    color: colors.text,
  },
});

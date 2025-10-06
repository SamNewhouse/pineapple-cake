import React from "react";
import { TabBar, Tab, useTheme } from "@ui-kitten/components";
import { Screen } from "../types";

const tabLabels: Screen[] = ["home", "scan", "inventory"];

export default function TopTabBar({
  selectedScreen,
  onTabSelect,
}: {
  selectedScreen: Screen;
  onTabSelect: (screen: Screen) => void;
}) {
  const theme = useTheme();
  const selectedIndex = tabLabels.indexOf(selectedScreen);

  return (
    <TabBar
      style={{
        backgroundColor: theme["color-dark"],
      }}
      indicatorStyle={{ height: 0 }}
      selectedIndex={selectedIndex}
      onSelect={(i) => onTabSelect(tabLabels[i])}
    >
      {tabLabels.map((label, i) => (
        <Tab
          key={label}
          title={label.charAt(0).toUpperCase() + label.slice(1)}
          style={{
            paddingVertical: 12,
            backgroundColor: i === selectedIndex ? theme["color-darkest"] : "transparent",
          }}
        />
      ))}
    </TabBar>
  );
}

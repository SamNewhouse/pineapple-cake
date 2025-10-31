import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ItemsScreen from "../5-screens/ItemsScreen";
import ScanScreen from "../5-screens/ScanScreen";
import TradeScreen from "../5-screens/TradeScreen";
import ProfileScreen from "../5-screens/ProfileScreen";

const Tab = createMaterialTopTabNavigator();

export default function TopTabBarNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Items"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#EBEBED" },
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 16 },
        tabBarStyle: { backgroundColor: "#171717" },
        tabBarActiveTintColor: "#EBEBED",
        tabBarInactiveTintColor: "#6f6f6f",
      }}
    >
      <Tab.Screen name="Items" component={ItemsScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Trade" component={TradeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

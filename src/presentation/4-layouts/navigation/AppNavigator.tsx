import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ScanScreen from "../../5-screens/ScanScreen";
import ItemsScreen from "../../5-screens/ItemsScreen";
import ProfileScreen from "../../5-screens/ProfileScreen";
import SettingsScreen from "../../5-screens/SettingsScreen";
import TradeScreen from "../../5-screens/TradeScreen";
import { AuthenticatedPlayer } from "../../../types";

export type StackParamList = {
  Main: undefined;
  SettingsScreen: { profileId: string };
};

export type TabParamList = {
  Items: undefined;
  Scan: undefined;
  Trade: undefined;
  Profile: { profileId: string; onProposeTrade?: () => void };
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<StackParamList>();

type MainTabsProps = { player: AuthenticatedPlayer };

function MainTabs({ player }: MainTabsProps) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Items" component={ItemsScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Trade" component={TradeScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ profileId: player.id }}
      />
    </Tab.Navigator>
  );
}

type AppNavigatorProps = {
  player: AuthenticatedPlayer;
  setPlayer: (p: AuthenticatedPlayer | null) => void;
};

export default function AppNavigator({ player }: AppNavigatorProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" options={{ headerShown: false }}>
        {() => <MainTabs player={player} />}
      </Stack.Screen>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

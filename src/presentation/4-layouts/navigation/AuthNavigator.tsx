import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../5-screens/LoginScreen";
import SignupScreen from "../../5-screens/SignupScreen";
import { AuthenticatedPlayer } from "../../../types";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type AuthNavigatorProps = {
  setPlayer: (player: AuthenticatedPlayer | null) => void;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator({ setPlayer }: AuthNavigatorProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setPlayer={setPlayer} />}
      </Stack.Screen>
      <Stack.Screen name="Signup">
        {(props) => <SignupScreen {...props} setPlayer={setPlayer} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

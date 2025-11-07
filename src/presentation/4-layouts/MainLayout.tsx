import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../store";
import ScreenLayout from "./ScreenLayout";
import AppInitializer from "./AppInitializer";
import Toast from "react-native-toast-message";
import { toastConfig } from "../1-atoms/Toast";
import { colors } from "../../config/theme";

export default function MainLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInitializer>
          <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar style="light" />
            <View style={{ flex: 1, backgroundColor: colors.background }}>
              <ScreenLayout />
            </View>
            <Toast config={toastConfig} />
          </SafeAreaView>
        </AppInitializer>
      </PersistGate>
    </Provider>
  );
}

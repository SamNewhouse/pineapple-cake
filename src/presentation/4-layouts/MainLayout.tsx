import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GameProvider } from "../../context/GameContext";
import { StaticDataProvider } from "../../context/StaticDataContext";
import { getData } from "../../lib/storage";
import { LocalStorage, AuthenticatedPlayer } from "../../types";
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import { Preloader } from "../3-organisms/Preloader";
import { Loading } from "../1-atoms/Loading";

export default function MainLayout() {
  const [player, setPlayer] = useState<AuthenticatedPlayer | null>(null);
  const [loading, setLoading] = useState(true);
  const [preloading, setPreloading] = useState(false);

  useEffect(() => {
    (async () => {
      const storedPlayer = await getData<AuthenticatedPlayer>(LocalStorage.PLAYER);
      setPlayer(storedPlayer?.token ? storedPlayer : null);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (player && !loading) {
      setPreloading(true);
    }
  }, [player, loading]);

  const handlePreloadComplete = () => {
    setPreloading(false);
  };

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  if (preloading) {
    return <Preloader onLoadComplete={handlePreloadComplete} />;
  }

  return (
    <StaticDataProvider>
      <GameProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#1D1D1D" }}>
            <StatusBar style="light" />
            <View style={{ flex: 1, backgroundColor: "#1D1D1D" }}>
              {player ? (
                <AppNavigator player={player} setPlayer={setPlayer} />
              ) : (
                <AuthNavigator setPlayer={setPlayer} />
              )}
            </View>
          </SafeAreaView>
        </NavigationContainer>
      </GameProvider>
    </StaticDataProvider>
  );
}

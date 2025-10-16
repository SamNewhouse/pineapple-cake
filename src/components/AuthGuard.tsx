import React, { useState, useEffect } from "react";
import { Layout, Text, Spinner, useTheme } from "@ui-kitten/components";
import { LocalStorage, Player } from "../types";
import { getTimedData } from "../core/storage";
import { LoginScreen } from "../screens/LoginScreen";
import { SignupScreen } from "../screens/SignupScreen";
import { usePlayer } from "../context/PlayerContext";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { player, setPlayer } = usePlayer();
  const [loading, setLoading] = useState(true);
  const [authScreen, setAuthScreen] = useState<"login" | "signup">("login");

  useEffect(() => {
    const checkPlayer = async () => {
      setLoading(true);
      const players = await getTimedData<Player>(LocalStorage.PLAYER);
      const loggedInPlayer =
        Array.isArray(players) && players.length > 0
          ? players.find((p) => p && typeof p.token === "string" && p.token.length > 0)
          : null;
      if (loggedInPlayer) setPlayer(loggedInPlayer);
      setLoading(false);
    };
    if (!player) checkPlayer();
    else setLoading(false);
  }, [player, setPlayer]);

  const handleSignedIn = (playerObj: Player) => {
    setPlayer(playerObj);
    setAuthScreen("login");
  };

  if (loading) {
    return (
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme["color-dark"],
        }}
      >
        <Text
          style={{
            color: theme["color-text"],
            fontSize: 24,
            marginBottom: 20,
            fontWeight: "bold",
          }}
        >
          Pineapple Cake
        </Text>
        <Text
          appearance="hint"
          style={{
            color: theme["color-warning"],
            marginBottom: 24,
            fontSize: 16,
          }}
        >
          Loading...
        </Text>
        <Spinner size="giant" status="primary" />
      </Layout>
    );
  }

  if (!player) {
    return authScreen === "login" ? (
      <LoginScreen onSignedIn={handleSignedIn} goToSignup={() => setAuthScreen("signup")} />
    ) : (
      <SignupScreen onSignedIn={handleSignedIn} goToLogin={() => setAuthScreen("login")} />
    );
  }

  // Authenticated: render children
  return <>{children}</>;
}

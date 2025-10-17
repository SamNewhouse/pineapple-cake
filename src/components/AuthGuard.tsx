import React, { useState, useEffect } from "react";
import { LocalStorage, Player } from "../types";
import { getTimedData } from "../core/storage";
import { LoginScreen } from "./5-screens/LoginScreen";
import { SignupScreen } from "./5-screens/SignupScreen";
import { useGame } from "../context/GameContext";
import { Loading } from "./Loading";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { player, setPlayer } = useGame();
  const [loading, setLoading] = useState(true);
  const [authScreen, setAuthScreen] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (player) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getTimedData<Player>(LocalStorage.PLAYER).then((players) => {
      const loggedInPlayer =
        Array.isArray(players) && players.length > 0
          ? players.find((p) => p && typeof p.token === "string" && p.token.length > 0)
          : null;
      if (loggedInPlayer) setPlayer(loggedInPlayer);
      setLoading(false);
    });
  }, [player, setPlayer]);

  const handleSignedIn = (playerObj: Player) => {
    setPlayer(playerObj);
    setAuthScreen("login");
  };

  if (loading) {
    return <Loading />;
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

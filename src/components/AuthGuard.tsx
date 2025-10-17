import React, { useState, useEffect } from "react";
import { LocalStorage, Player } from "../types";
import { getTimedData } from "../core/storage";
import { LoginScreen } from "./5-screens/LoginScreen";
import { SignupScreen } from "./5-screens/SignupScreen";
import { useGame } from "../context/GameContext";
import { Loading } from "./Loading";
import { LoadingScreen } from "./5-screens/LoadingScreen";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { player, setPlayer } = useGame();
  const [status, setStatus] = useState<"auth-loading" | "preloading" | "authed">("auth-loading");
  const [authScreen, setAuthScreen] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (player) {
      setStatus("preloading");
      return;
    }
    setStatus("auth-loading");
    getTimedData<Player>(LocalStorage.PLAYER).then((players) => {
      const loggedInPlayer =
        Array.isArray(players) && players.length > 0
          ? players.find((p) => p && typeof p.token === "string" && p.token.length > 0)
          : null;
      if (loggedInPlayer) setPlayer(loggedInPlayer);
      else setStatus("auth-loading");
    });
  }, [player, setPlayer]);

  const handleSignedIn = (playerObj: Player) => {
    setPlayer(playerObj);
    setAuthScreen("login");
    setStatus("preloading");
  };

  if (status === "auth-loading") {
    return <Loading message="Checking authentication..." />;
  }

  if (!player) {
    return authScreen === "login" ? (
      <LoginScreen onSignedIn={handleSignedIn} goToSignup={() => setAuthScreen("signup")} />
    ) : (
      <SignupScreen onSignedIn={handleSignedIn} goToLogin={() => setAuthScreen("login")} />
    );
  }

  if (status === "preloading") {
    return <LoadingScreen onLoadComplete={() => setStatus("authed")} />;
  }

  // AUTHGUARD: Auth & preload complete, render app
  return <>{children}</>;
}

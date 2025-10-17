import React, { useState, useEffect } from "react";
import { LocalStorage, Player } from "../types";
import { getTimedData } from "../core/storage";
import { LoginScreen } from "./5-screens/LoginScreen";
import { SignupScreen } from "./5-screens/SignupScreen";
import { useGame } from "../context/GameContext";
import { Loading } from "./Loading";
import { LoadingScreen } from "./5-screens/LoadingScreen";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { player, setPlayer, setItems, setCollectables } = useGame();
  const [status, setStatus] = useState<"auth-loading" | "preloading" | "authed">("auth-loading");
  const [authScreen, setAuthScreen] = useState<"login" | "signup">("login");

  useEffect(() => {
    // AUTHGUARD: Attempt to hydrate player from storage
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, setPlayer]);

  const handleSignedIn = (playerObj: Player) => {
    setPlayer(playerObj);
    setAuthScreen("login");
    setStatus("preloading");
  };

  // AUTHGUARD: Loading state for auth or player hydration
  if (status === "auth-loading") {
    return <Loading message="Checking authentication..." />;
  }

  // AUTHGUARD: Not logged in, show login or signup
  if (!player) {
    return authScreen === "login" ? (
      <LoginScreen onSignedIn={handleSignedIn} goToSignup={() => setAuthScreen("signup")} />
    ) : (
      <SignupScreen onSignedIn={handleSignedIn} goToLogin={() => setAuthScreen("login")} />
    );
  }

  // AUTHGUARD: Logged in, check for post-login preload
  if (status === "preloading") {
    return <LoadingScreen onLoadComplete={() => setStatus("authed")} />;
  }

  // AUTHGUARD: Auth & preload complete, render app
  return <>{children}</>;
}

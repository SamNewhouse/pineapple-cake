import React, { useState, useEffect } from "react";
import { AuthenticatedPlayer, LocalStorage, Player } from "../../types";
import { getData } from "../../lib/storage";
import { LoginScreen } from "../5-screens/LoginScreen";
import { SignupScreen } from "../5-screens/SignupScreen";
import { useGame } from "../../context/GameContext";
import { Loading } from "../1-atoms/Loading";
import { Preloader } from "../3-organisms/Preloader";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { player, setPlayer } = useGame();
  const [status, setStatus] = useState<"auth-loading" | "preloading" | "authed">("auth-loading");
  const [authScreen, setAuthScreen] = useState<"login" | "signup">("login");
  const [checkedStorage, setCheckedStorage] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setStatus("auth-loading");
      setCheckedStorage(false);

      try {
        // Retrieve stored player and token separately
        const player = await getData<AuthenticatedPlayer>(LocalStorage.PLAYER);

        if (player && player.token) {
          setPlayer(player);
          setStatus("preloading");
        } else {
          setCheckedStorage(true);
        }
      } catch (error) {
        console.error("[AUTH.guard] Error checking storage:", error);
        setCheckedStorage(true);
      }
    };

    checkAuth();
  }, [setPlayer]);

  const handleSignedIn = (playerObj: AuthenticatedPlayer) => {
    setPlayer(playerObj);
    setAuthScreen("login");
    setStatus("preloading");
  };

  if (status === "auth-loading" && !checkedStorage) {
    return <Loading message="Checking authentication..." />;
  }

  if (!player && checkedStorage) {
    return authScreen === "login" ? (
      <LoginScreen onSignedIn={handleSignedIn} goToSignup={() => setAuthScreen("signup")} />
    ) : (
      <SignupScreen onSignedIn={handleSignedIn} goToLogin={() => setAuthScreen("login")} />
    );
  }

  if (status === "preloading") {
    return <Preloader onLoadComplete={() => setStatus("authed")} />;
  }

  if (status === "authed" && player) {
    return <>{children}</>;
  }

  return <LoginScreen onSignedIn={handleSignedIn} goToSignup={() => setAuthScreen("signup")} />;
}

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { LoginScreen } from "../5-screens/LoginScreen";
import { SignupScreen } from "../5-screens/SignupScreen";
import { Loading } from "../1-atoms/Loading";
import { setPlayer } from "../../store/playerSlice";
import { setItems } from "../../store/itemSlice";
import { setCollectables } from "../../store/collectableSlice";
import { setRarities } from "../../store/raritySlice";
import { AuthenticatedPlayer } from "../../types";
import { getPlayerItemsAPI } from "../../core/api/players";
import { getAllCollectablesAPI } from "../../core/api/collectables";
import { getAllRaritiesAPI } from "../../core/api/rarities";
import { Centered } from "../1-atoms/Centered";
import { View } from "react-native";
import { colors } from "../../config/theme";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const player = useSelector((state: RootState) => state.player.player);
  const items = useSelector((state: RootState) => state.items.items);
  const collectables = useSelector((state: RootState) => state.collectables.collectables);
  const rarities = useSelector((state: RootState) => state.rarities.rarities);
  const [authScreen, setAuthScreen] = useState<"login" | "signup">("login");
  const [loadingUserData, setLoadingUserData] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (player && player.token && items) {
      console.log(`[AUTH] user=${player.email || player.id} items=${items.length}`);
    }
  }, [player, items]);

  useEffect(() => {
    const fetchMissingData = async () => {
      if (player && player.token) {
        if (!collectables || collectables.length === 0 || !rarities || rarities.length === 0) {
          setLoadingUserData(true);
          try {
            if (!collectables || collectables.length === 0) {
              const data = await getAllCollectablesAPI();
              dispatch(setCollectables(data));
            }
            if (!rarities || rarities.length === 0) {
              const data = await getAllRaritiesAPI();
              dispatch(setRarities(data));
            }
          } finally {
            setLoadingUserData(false);
          }
        }
      }
    };
    fetchMissingData();
  }, [player, collectables, rarities, dispatch]);

  // Handle sign in and load initial items
  const handleSignedIn = async (playerObj: AuthenticatedPlayer) => {
    dispatch(setPlayer(playerObj));
    setAuthScreen("login");
    setLoadingUserData(true);
    try {
      const items = await getPlayerItemsAPI(playerObj.id);
      console.log(`[AUTH] Signed in as ${playerObj.email || playerObj.id} items=${items.length}`);
      dispatch(setItems(items));
    } finally {
      setLoadingUserData(false);
    }
  };

  if (!player) {
    return authScreen === "login" ? (
      <LoginScreen onSignedIn={handleSignedIn} goToSignup={() => setAuthScreen("signup")} />
    ) : (
      <SignupScreen onSignedIn={handleSignedIn} goToLogin={() => setAuthScreen("login")} />
    );
  }

  if (loadingUserData) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Centered>
          <Loading message="Loading your game data..." size="large" />
        </Centered>
      </View>
    );
  }

  return <>{children}</>;
}

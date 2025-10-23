import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { AuthenticatedPlayer, Player } from "../../types";
import { Input } from "../1-atoms/Input";
import { Button } from "../1-atoms/Button";
import { useGame } from "../../context/GameContext";
import { loginAPI } from "../../core/api/auth";
import { getData } from "../../lib/storage";
import { LocalStorage } from "../../types";
import { handleLoginSuccess } from "../../core/functions/auth";

interface LoginScreenProps {
  onSignedIn: (player: AuthenticatedPlayer) => void;
  goToSignup: () => void;
}

export function LoginScreen({ onSignedIn, goToSignup }: LoginScreenProps) {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPlayer } = useGame();

  useEffect(() => {
    const checkStoredPlayer = async () => {
      try {
        const storedPlayer = await getData<AuthenticatedPlayer>(LocalStorage.PLAYER);
        if (storedPlayer?.token) {
          setPlayer(storedPlayer);
          onSignedIn(storedPlayer);
        }
      } catch (e) {
        console.warn("[LoginScreen] Failed to retrieve stored token", e);
      }
    };
    checkStoredPlayer();
  }, [setPlayer, onSignedIn]);

  // Manual login
  async function handleLogin() {
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const player = await loginAPI(email, password);

      if (!player?.id || !player.token) {
        throw new Error("Invalid server response — missing player or token.");
      }

      await handleLoginSuccess(player);
      onSignedIn(player);
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (error) setError(null);
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (error) setError(null);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1D1D1D",
      }}
    >
      <Text
        style={{
          marginBottom: 20,
          color: "#EBEBED",
          fontWeight: "bold",
          fontSize: 32,
          textAlign: "center",
        }}
      >
        Pineapple Cake
      </Text>
      <Text style={{ marginBottom: 40, color: "#9D8751", fontSize: 16, textAlign: "center" }}>
        Sign in to continue
      </Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
        autoComplete="password"
      />

      <Button onPress={handleLogin}>{loading ? "Signing In..." : "Sign In"}</Button>
      <Text style={{ color: "#444444", marginBottom: 12, fontWeight: "bold" }} onPress={goToSignup}>
        Don't have an account? Sign up
      </Text>
      {!!error && (
        <Text style={{ marginBottom: 20, color: "#7B4141", fontWeight: "bold" }}>{error}</Text>
      )}
    </View>
  );
}

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Input } from "../1-atoms/Input";
import { Button } from "../1-atoms/Button";
import { AuthenticatedPlayer } from "../../types";
import { loginAPI } from "../../core/api/auth";
import { getData } from "../../lib/storage";
import { LocalStorage } from "../../types";
import { handleLoginSuccess } from "../../core/functions/auth";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../4-layouts/navigation/AuthNavigator";

type LoginScreenProps = StackScreenProps<AuthStackParamList, "Login"> & {
  setPlayer: (player: AuthenticatedPlayer | null) => void;
};

export default function LoginScreen({ setPlayer, navigation }: LoginScreenProps) {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkStoredPlayer = async () => {
      try {
        const storedPlayer = await getData<AuthenticatedPlayer>(LocalStorage.PLAYER);
        if (storedPlayer?.token) {
          setPlayer(storedPlayer);
        }
      } catch (e) {
        console.warn("[LoginScreen] Failed to retrieve stored token", e);
      }
    };
    checkStoredPlayer();
  }, [setPlayer]);

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
      setPlayer(player);
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

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
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoComplete="password"
      />

      <Button onPress={handleLogin}>{loading ? "Signing In..." : "Sign In"}</Button>
      <Text
        style={{ color: "#444444", marginBottom: 12, fontWeight: "bold" }}
        onPress={() => navigation.navigate("Signup")}
      >
        Don't have an account? Sign up
      </Text>
      {!!error && (
        <Text style={{ marginBottom: 20, color: "#7B4141", fontWeight: "bold" }}>{error}</Text>
      )}
    </View>
  );
}

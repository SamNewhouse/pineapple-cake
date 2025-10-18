import React, { useState } from "react";
import { View, Text } from "react-native";
import { Player } from "../../types";
import { Input } from "../1-atoms/Input";
import { Button } from "../1-atoms/Button";
import { useGame } from "../../context/GameContext";
import { handleLoginSuccess } from "../../core/auth";
import { loginAPI } from "../../core/api/auth";

interface LoginScreenProps {
  onSignedIn: (player: Player) => void;
  goToSignup: () => void;
}

export function LoginScreen({ onSignedIn, goToSignup }: LoginScreenProps) {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPlayer } = useGame();

  async function handleLogin() {
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const result = await loginAPI(email, password);
      const player: Player = result.data;
      await handleLoginSuccess(player, setPlayer);
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
      <Text
        style={{
          marginBottom: 40,
          color: "#9D8751",
          fontSize: 16,
          textAlign: "center",
        }}
      >
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
      <Text
        style={{
          color: "#444444",
          marginBottom: 12,
          fontWeight: "bold",
        }}
        onPress={goToSignup}
      >
        Don't have an account? Sign up
      </Text>
      {!!error && (
        <Text
          style={{
            marginBottom: 20,
            color: "#7B4141",
            fontWeight: "bold",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

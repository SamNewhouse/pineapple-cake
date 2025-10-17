import React, { useState } from "react";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { loginAPI } from "../../api/auth";
import { Player } from "../../types";
import { Input } from "../Input";
import { Button } from "../Button";
import { useGame } from "../../context/GameContext";
import { handleLoginSuccess } from "../../core/auth";

interface LoginScreenProps {
  onSignedIn: (player: Player) => void;
  goToSignup: () => void;
}

export function LoginScreen({ onSignedIn, goToSignup }: LoginScreenProps) {
  const theme = useTheme();
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

  // Optionally clear error on input change
  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (error) setError(null);
  };
  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (error) setError(null);
  };

  return (
    <Layout
      level="2"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme["color-dark"],
      }}
    >
      <Text
        category="h1"
        style={{
          marginBottom: 20,
          color: theme["color-text"],
          fontWeight: "bold",
        }}
      >
        Pineapple Cake
      </Text>
      <Text
        appearance="hint"
        style={{
          marginBottom: 40,
          color: theme["color-warning"],
        }}
      >
        Sign in to continue
      </Text>
      <Input
        theme={theme}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />
      <Input
        theme={theme}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
        autoComplete="password"
      />
      <Button
        theme={theme}
        onPress={handleLogin}
        disabled={loading || !email.trim() || !password.trim()}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>
      <Text
        style={{
          color: theme["color-primary"],
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
            color: theme["color-danger"],
            fontWeight: "bold",
          }}
        >
          {error}
        </Text>
      )}
    </Layout>
  );
}

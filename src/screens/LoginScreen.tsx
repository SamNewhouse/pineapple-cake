import React, { useState } from "react";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { loginAPI } from "../api/auth";
import { addTimedData } from "../core/storage";
import { LocalStorage, Player } from "../types";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

interface LoginScreenProps {
  onSignedIn: (player: Player) => void;
  goToSignup: () => void;
}

export function LoginScreen({ onSignedIn, goToSignup }: LoginScreenProps) {
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const result = await loginAPI(email, password);
      const player: Player = result.data;
      await addTimedData(LocalStorage.PLAYER, player, 90 * 24 * 60 * 60 * 1000);
      onSignedIn(player);
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  }

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
      <Input theme={theme} placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        theme={theme}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button theme={theme} onPress={handleLogin}>
        Sign In
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

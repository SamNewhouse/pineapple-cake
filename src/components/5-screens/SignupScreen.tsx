import React, { useState } from "react";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { signupAPI } from "../../api/auth";
import { handleLoginSuccess } from "../../core/auth";
import { Input } from "../Input";
import { Button } from "../Button";
import { Player } from "../../types";

interface SignupScreenProps {
  onSignedIn: (player: Player) => void;
  goToLogin: () => void;
}

export function SignupScreen({ onSignedIn, goToLogin }: SignupScreenProps) {
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const result = await signupAPI(email, password);
      const player: Player = result.data;
      await handleLoginSuccess(player, onSignedIn);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  // Clear error when user changes input
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
        Create a new account
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
        onPress={handleSignup}
        disabled={loading || !email.trim() || !password.trim()}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
      <Text
        style={{
          color: theme["color-primary"],
          marginBottom: 12,
          fontWeight: "bold",
        }}
        onPress={goToLogin}
      >
        Already have an account? Sign in
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

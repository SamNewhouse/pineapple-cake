import React, { useState } from "react";
import { View, Text } from "react-native";
import { AuthenticatedPlayer } from "../../types";
import { Input } from "../1-atoms/Input";
import { Button } from "../1-atoms/Button";
import { loginAPI } from "../../core/api/auth";
import { colors, font, spacing } from "../../config/theme";

interface LoginScreenProps {
  onSignedIn: (player: AuthenticatedPlayer) => void;
  goToSignup: () => void;
}

export function LoginScreen({ onSignedIn, goToSignup }: LoginScreenProps) {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          marginBottom: spacing.lg,
          color: colors.text,
          fontWeight: font.weightBold,
          fontSize: font.h1,
          textAlign: "center",
          fontFamily: font.family,
        }}
      >
        Pineapple Cake
      </Text>
      <Text
        style={{
          marginBottom: spacing.xl,
          color: colors.accent,
          fontSize: font.body,
          textAlign: "center",
          fontFamily: font.family,
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
          color: colors.textMuted,
          marginBottom: spacing.md,
          fontWeight: font.weightBold,
          fontFamily: font.family,
        }}
        onPress={goToSignup}
      >
        Don't have an account? Sign up
      </Text>
      {!!error && (
        <Text
          style={{
            marginBottom: spacing.lg,
            color: colors.danger,
            fontWeight: font.weightBold,
            fontFamily: font.family,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

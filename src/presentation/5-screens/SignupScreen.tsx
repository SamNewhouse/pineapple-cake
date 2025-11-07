import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "../1-atoms/Input";
import { Button } from "../1-atoms/Button";
import { AuthenticatedPlayer } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setPlayer } from "../../store/playerSlice";
import { signupAPI } from "../../core/api/auth";
import { handleLoginSuccess } from "../../core/functions/auth";
import { colors, font, spacing } from "../../config/theme";

interface SignupScreenProps {
  onSignedIn: (player: AuthenticatedPlayer) => void;
  goToLogin: () => void;
}

export function SignupScreen({ onSignedIn, goToLogin }: SignupScreenProps) {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  async function handleSignup() {
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const player: AuthenticatedPlayer = await signupAPI(email, password);

      if (!player?.id || !player.token) {
        throw new Error("Invalid server response — missing player or token.");
      }

      await handleLoginSuccess(player);
      dispatch(setPlayer(player));
      onSignedIn(player);
    } catch (err: any) {
      setError(err.message || "Registration failed");
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
        Create a new account
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
      <Button onPress={handleSignup}>{loading ? "Signing Up..." : "Sign Up"}</Button>
      <Text
        style={{
          color: colors.textMuted,
          marginBottom: spacing.md,
          fontWeight: font.weightBold,
          fontFamily: font.family,
        }}
        onPress={goToLogin}
      >
        Already have an account? Sign in
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

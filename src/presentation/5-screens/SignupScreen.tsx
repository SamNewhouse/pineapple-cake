import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "../1-atoms/Input";
import { Button } from "../1-atoms/Button";
import { AuthenticatedPlayer } from "../../types";
import { signupAPI } from "../../core/api/auth";
import { handleLoginSuccess } from "../../core/functions/auth";

interface SignupScreenProps {
  onSignedIn: (player: AuthenticatedPlayer) => void;
  goToLogin: () => void;
}

export function SignupScreen({ onSignedIn, goToLogin }: SignupScreenProps) {
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
      const player: AuthenticatedPlayer = await signupAPI(email, password);

      if (!player?.id || !player.token) {
        throw new Error("Invalid server response — missing player or token.");
      }

      await handleLoginSuccess(player);

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
          color: "#444444",
          marginBottom: 12,
          fontWeight: "bold",
        }}
        onPress={goToLogin}
      >
        Already have an account? Sign in
      </Text>
      {!!error && (
        <Text style={{ marginBottom: 20, color: "#7B4141", fontWeight: "bold" }}>{error}</Text>
      )}
    </View>
  );
}

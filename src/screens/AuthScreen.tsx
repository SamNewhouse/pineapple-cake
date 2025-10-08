import React from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import * as Google from "expo-auth-session/providers/google";
import { googleSignInAPI } from "../api/player";
import { addTimedData } from "../core/storage";
import { StorageKey } from "../types";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

interface AuthScreenProps {
  theme: { [key: string]: string };
  onSignedIn: (player: any) => void;
}

export function AuthScreen({ theme, onSignedIn }: AuthScreenProps) {
  const GOOGLE_CLIENT_ID = "<your-client-id>.apps.googleusercontent.com";
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
  });
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const processAuth = async () => {
      if (response?.type === "success") {
        try {
          const { id_token } = response.params;
          const result = await googleSignInAPI(id_token);
          await addTimedData(StorageKey.players, result.player, THIRTY_DAYS_MS);
          onSignedIn(result.player);
        } catch (err: any) {
          setError(err.message || "Login failed");
        }
      }
    };
    processAuth();
  }, [response]);

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
          marginBottom: 80,
          color: theme["color-warning"],
        }}
      >
        Scan, collect and trade!
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
      <Button
        status="primary"
        onPress={() => promptAsync()}
        style={{
          backgroundColor: theme["color-darkest"],
          borderColor: theme["color-dark"],
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginVertical: "5%",
        }}
        appearance="filled"
        disabled={!request}
      >
        Sign in with Google
      </Button>
    </Layout>
  );
}

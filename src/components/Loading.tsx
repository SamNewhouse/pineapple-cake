import React from "react";
import { Layout, Text, Spinner, useTheme } from "@ui-kitten/components";

interface LoadingProps {
  message?: string;
  size?: "tiny" | "small" | "medium" | "large" | "giant";
}

export const Loading: React.FC<LoadingProps> = ({ message = "Loading...", size = "large" }) => {
  const theme = useTheme();

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
      <Spinner
        size={size}
        style={{
          marginBottom: 20,
        }}
      />
      <Text
        category="h6"
        style={{
          color: theme["color-text"],
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {message}
      </Text>
    </Layout>
  );
};

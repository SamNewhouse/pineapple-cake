import React from "react";
import { Layout, Spinner, Text } from "@ui-kitten/components";

export interface ProcessingViewProps {
  theme: { [key: string]: string };
}

export function ProcessingView({ theme }: ProcessingViewProps) {
  return (
    <Layout
      level="2"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: theme["color-dark"],
      }}
    >
      <Spinner size="giant" style={{ borderColor: theme["color-primary"] }} />
      <Text category="h2" style={{ marginTop: 16, color: theme["color-text"] }}>
        Processing...
      </Text>
    </Layout>
  );
}

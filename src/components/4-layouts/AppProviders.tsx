import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import scannerTheme from "../../styling/theme.json";
import customMapping from "../../styling/mapping.json";
import { GameProvider } from "../../context/GameContext";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GameProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.dark, ...scannerTheme }}
        customMapping={customMapping}
      >
        {children}
      </ApplicationProvider>
    </GameProvider>
  );
}

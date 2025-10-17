import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { PlayerContext } from "../../context/PlayerContext";
import { ItemsProvider } from "../../context/ItemsContext";
import scannerTheme from "../../styling/theme.json";
import customMapping from "../../styling/mapping.json";

export default function AppProviders({
  children,
  playerContextValue,
}: {
  children: React.ReactNode;
  playerContextValue: any;
}) {
  return (
    <PlayerContext.Provider value={playerContextValue}>
      <ItemsProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.dark, ...scannerTheme }}
          customMapping={customMapping}
        >
          {children}
        </ApplicationProvider>
      </ItemsProvider>
    </PlayerContext.Provider>
  );
}

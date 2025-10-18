import React from "react";
import { GameProvider } from "../../context/GameContext";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}

import React from "react";
import { Text, View } from "react-native";
import { Player } from "../../types";
import { getColor } from "../../utils/colors";
import * as theme from "../../config/theme";

export interface PlayerIconProps {
  player: Player;
}

function playerInitials(username: string) {
  const nameParts = username.trim().split("-");
  if (nameParts.length === 1) {
    return nameParts[0].slice(0, 2).toUpperCase();
  }
  return ((nameParts[0][0] || "") + (nameParts[1][0] || "")).toUpperCase();
}

const colors = [
  "#681010",
  "#217567",
  "#3465A4",
  "#A94DC5",
  "#C7822B",
  "#357A38",
  "#6371A6",
  "#96002f",
  "#928922",
  "#4B2D73",
];

export const PlayerIcon: React.FC<PlayerIconProps> = ({ player }) => {
  const initials = playerInitials(player.username);
  const bgColor = getColor(player.id, colors);

  return (
    <View
      style={{
        borderRadius: theme.borderRadius.round,
        borderWidth: 0,
        width: 124,
        height: 124,
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: theme.spacing.md,
      }}
    >
      <Text style={{ fontSize: 50, fontWeight: theme.font.weightBold, color: theme.colors.white }}>
        {initials}
      </Text>
    </View>
  );
};

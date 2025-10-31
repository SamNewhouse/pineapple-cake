import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useRequiredPlayer } from "../../context/GameContext";
import { PlayerIcon } from "../1-atoms/PlayerIcon";
import { Player } from "../../types";
import { getPlayerByIdAPI } from "../../core/api/players";
import { Button } from "../1-atoms/Button";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList, TabParamList } from "../4-layouts/navigation/AppNavigator";

export default function ProfileScreen() {
  const { player } = useRequiredPlayer();
  const [profilePlayer, setProfilePlayer] = useState<Player | null>(null);
  const navigation = useNavigation<StackNavigationProp<StackParamList, "Main">>();
  const route = useRoute<RouteProp<TabParamList, "Profile">>();
  const { profileId, onProposeTrade } = route.params || {};

  useEffect(() => {
    if (profileId !== player.id) {
      getPlayerByIdAPI(profileId).then(setProfilePlayer);
    } else {
      setProfilePlayer(player);
    }
  }, [profileId, player]);

  const isSelf = profileId === player.id;
  if (!profilePlayer) return null;

  const displayFields: Array<{ label: string; value: string | number }> = [
    { label: "Total Scans", value: profilePlayer.totalScans },
    { label: "Member Since", value: new Date(profilePlayer.createdAt).toLocaleDateString() },
  ];

  if (isSelf && profilePlayer.email) {
    displayFields.push({ label: "Email", value: profilePlayer.email });
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#1D1D1D" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <PlayerIcon player={profilePlayer} />
        <Text
          style={{
            marginBottom: 12,
            color: "#9D8751",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {isSelf ? "Your Profile" : `${profilePlayer.username}'s Profile`}
        </Text>
        <View style={{ width: "100%", marginBottom: 24 }}>
          {displayFields.map((item) => (
            <View key={item.label} style={{ marginBottom: 12 }}>
              <Text style={{ color: "#6f6f6f", fontWeight: "600", fontSize: 14 }}>
                {item.label}:
              </Text>
              <Text style={{ color: "#EBEBED", fontSize: 26 }}>{item.value}</Text>
            </View>
          ))}
        </View>
        <View>
          <Button onPress={() => navigation.navigate("SettingsScreen", { profileId: player.id })}>
            Settings
          </Button>
        </View>
        {!isSelf && onProposeTrade && (
          <View style={{ width: "100%", marginTop: 8 }}>
            <Text style={{ marginBottom: 12, color: "#517F5F", textAlign: "center" }}>
              Interested in trading?
            </Text>
            <Text
              style={{
                backgroundColor: "#9D8751",
                color: "#1D1D1D",
                fontWeight: "bold",
                padding: 12,
                borderRadius: 5,
                textAlign: "center",
                overflow: "hidden",
              }}
              onPress={onProposeTrade}
            >
              Propose Trade
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

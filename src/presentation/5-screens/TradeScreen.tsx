import { Text, View } from "react-native";
import { useRequiredPlayer } from "../../context/GameContext";

export default function ScanScreen() {
  const { player } = useRequiredPlayer();

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1D1D1D",
        }}
      >
        <Text style={{ color: "#EBEBED", fontSize: 32, fontWeight: "800", marginBottom: 12 }}>
          {player.username}'s Trades
        </Text>
      </View>
    </>
  );
}

import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { colors, font, spacing } from "../../config/theme";

export default function ScanScreen() {
  const player = useSelector((state: RootState) => state.player.player);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: font.h1,
            fontWeight: font.weightBold,
            marginBottom: spacing.md,
          }}
        >
          {player!.username}'s Trades
        </Text>
      </View>
    </>
  );
}

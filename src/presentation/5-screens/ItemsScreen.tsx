import { View } from "react-native";
import { ItemsList } from "../2-molecules/ItemsList";
import { Loading } from "../1-atoms/Loading";
import { useHydratedItems } from "../../core/functions/items";

export default function ItemsScreen() {
  const { hydratedItems, ready } = useHydratedItems();

  if (!ready) return <Loading />;

  return (
    <View style={{ flex: 1, backgroundColor: "#1D1D1D" }}>
      <ItemsList
        hydratedItems={hydratedItems}
        onItemPress={() => {}}
        refreshing={false}
        onRefresh={() => {}}
      />
    </View>
  );
}

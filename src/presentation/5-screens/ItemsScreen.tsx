import React, { useState } from "react";
import { View } from "react-native";
import { Loading } from "../1-atoms/Loading";
import { useHydratedItems } from "../../core/functions/items";
import { ItemsList } from "../3-organisms/ItemsList";
import { ItemModal } from "../1-atoms/ItemModal";
import { HydratedItem } from "../../types";

export default function ItemsScreen() {
  const { hydratedItems, ready } = useHydratedItems();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<HydratedItem | null>(null);

  const handleItemPress = (item: HydratedItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  if (!ready) return <Loading />;

  return (
    <View style={{ flex: 1, backgroundColor: "#1D1D1D" }}>
      <ItemsList
        hydratedItems={hydratedItems}
        onItemPress={handleItemPress}
        refreshing={false}
        onRefresh={() => {}}
      />
      <ItemModal visible={modalVisible} hydratedItem={selectedItem} onClose={closeModal} />
    </View>
  );
}

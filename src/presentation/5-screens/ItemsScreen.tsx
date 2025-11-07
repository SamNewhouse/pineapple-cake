import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Loading } from "../1-atoms/Loading";
import { useHydratedItems } from "../../core/functions/items";
import { ItemsList } from "../3-organisms/ItemsList";
import { ItemModal } from "../1-atoms/ItemModal";
import { HydratedItem } from "../../types";
import { getPlayerItemsAPI } from "../../core/api/players";
import { useDispatch, useSelector } from "react-redux";
import { setError, setItems, setLoading } from "../../store/itemSlice";
import { RootState } from "../../store";
import Toast from "react-native-toast-message";

const MIN_REFRESH_INTERVAL = 30000;

export default function ItemsScreen() {
  const { hydratedItems, ready } = useHydratedItems();
  const player = useSelector((state: RootState) => state.player.player);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<HydratedItem | null>(null);
  const lastRefresh = useRef(0);
  const [refreshing, setRefreshing] = useState(false);

  const sortedItems = hydratedItems
    ? [...hydratedItems].sort(
        (a, b) => new Date(b.item.foundAt).getTime() - new Date(a.item.foundAt).getTime(),
      )
    : [];

  const handleRefresh = async () => {
    const now = Date.now();
    if (now - lastRefresh.current < MIN_REFRESH_INTERVAL) {
      Toast.show({
        type: "info",
        text1: "Please Wait",
        text2: "You can only refresh items every 30 seconds.",
      });
      return;
    }

    lastRefresh.current = now;

    dispatch(setLoading(true));
    setRefreshing(true);
    try {
      if (player) {
        const items = await getPlayerItemsAPI(player.id);
        dispatch(setItems(items));
        dispatch(setError(null));
      }
    } catch (err: any) {
      dispatch(setError(err?.message || "Failed to load items"));
    }
    dispatch(setLoading(false));
    setRefreshing(false);
  };

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
    <View style={{ flex: 1 }}>
      <ItemsList
        hydratedItems={sortedItems}
        onItemPress={handleItemPress}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      <ItemModal visible={modalVisible} hydratedItem={selectedItem} onClose={closeModal} />
    </View>
  );
}

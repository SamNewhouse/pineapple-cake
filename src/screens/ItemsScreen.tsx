import React, { useState, useEffect } from "react";
import { Layout, useTheme } from "@ui-kitten/components";
import { Item, Collectable } from "../types";
import { ItemsList } from "../components/ItemsList";
import { Loading } from "../components/Loading";
import { getPlayerItemsAPI, getCollectablesAPI } from "../api/items";
import { useRequiredPlayer } from "../context/PlayerContext";
import { getData, storeData } from "../core/storage";
import { LocalStorage } from "../types";
import { log, logError } from "../core/logging";

export default function ItemsScreen() {
  const theme = useTheme();
  const player = useRequiredPlayer();
  const [items, setItems] = useState<Item[]>([]);
  const [collectables, setCollectables] = useState<Map<string, Collectable>>(new Map());
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadPlayerItems = async (): Promise<void> => {
    try {
      // Get player items
      const response = await getPlayerItemsAPI(player.id, player.token);
      if (!response.success || !response.data?.items) {
        logError(`[ITEMS] Failed to load player items:`, response.error);
        return;
      }

      const allPlayerItems: Item[] = response.data.items;
      setItems(allPlayerItems);

      if (allPlayerItems.length === 0) {
        log(`[ITEMS] No player items found`);
        return;
      }

      log(`[ITEMS] Loaded ${allPlayerItems.length} player items`);

      // Load collectables if needed
      await loadCollectablesIfNeeded(allPlayerItems);
    } catch (error) {
      logError(`[ITEMS] Error loading player items:`, error);
    } finally {
      setLoading(false);
    }
  };

  const loadCollectablesIfNeeded = async (playerItems: Item[]): Promise<void> => {
    // Get unique collectable IDs needed
    const requiredIds = [...new Set(playerItems.map((item) => item.collectableId))];

    // Check cache first
    const cached = await getData<Record<string, Collectable>>(LocalStorage.COLLECTABLE);

    if (cached) {
      const cachedMap = new Map(Object.entries(cached));
      const missingIds = requiredIds.filter((id) => !cachedMap.has(id));

      if (missingIds.length === 0) {
        log(`[ITEMS] All ${requiredIds.length} collectables available in cache`);
        setCollectables(cachedMap);
        return;
      }

      log(`[ITEMS] Found ${missingIds.length} missing collectables`);
    }

    // Fetch all collectables
    log(`[ITEMS] Fetching collectables from API...`);
    const collectablesResponse = await getCollectablesAPI();

    // FIXED: Check the correct success field
    if (
      collectablesResponse.status !== 200 ||
      !collectablesResponse.data?.success ||
      !collectablesResponse.data?.data?.items
    ) {
      logError(
        `[ITEMS] Failed to fetch collectables:`,
        collectablesResponse.data?.error || "Unknown error",
      );
      return;
    }

    // Convert to Map and save
    const collectablesMap = new Map<string, Collectable>();
    collectablesResponse.data.data.items.forEach((collectable: Collectable) => {
      collectablesMap.set(collectable.id, collectable);
    });

    // Save to storage
    await storeData(LocalStorage.COLLECTABLE, Object.fromEntries(collectablesMap));
    setCollectables(collectablesMap);

    log(`[ITEMS] Loaded ${collectablesMap.size} collectables`);
  };

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    try {
      await loadPlayerItems();
    } finally {
      setRefreshing(false);
    }
  };

  const handleItemPress = (item: Item, collectable?: Collectable): void => {
    log(`[ITEMS] Item pressed:`, { item, collectable });
  };

  useEffect(() => {
    loadPlayerItems();
  }, [player.id]);

  if (loading) {
    return <Loading message="Loading your items..." />;
  }

  return (
    <Layout
      level="2"
      style={{
        flex: 1,
        backgroundColor: theme["color-dark"],
      }}
    >
      <ItemsList
        items={items}
        collectables={collectables}
        onItemPress={handleItemPress}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </Layout>
  );
}

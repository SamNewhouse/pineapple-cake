import { useMemo } from "react";
import { useGame } from "../../context/GameContext";
import { useStaticData } from "../../context/StaticDataContext";
import { Collectable, HydratedItem, Item, Rarity } from "../../types";

export function useHydratedItems() {
  const { items } = useGame();
  const { collectables, rarities, ready } = useStaticData();

  const collectablesMap = useMemo(
    () => new Map(collectables.map((c) => [c.id, c])),
    [collectables],
  );
  const raritiesMap = useMemo(() => new Map(rarities.map((r) => [r.id, r])), [rarities]);

  const hydratedItems = useMemo(
    () =>
      items
        .map((item) => {
          const collectable = collectablesMap.get(item.collectableId);
          const rarity = collectable ? raritiesMap.get(collectable.rarity) : undefined;
          return collectable && rarity ? { item, collectable, rarity } : null;
        })
        .filter((x): x is HydratedItem => !!x),
    [items, collectablesMap, raritiesMap],
  );

  return { hydratedItems, ready };
}

export function hydrateItem<T extends { collectableId?: string }>(
  itemLike: T,
  collectables: Collectable[],
  rarities: Rarity[],
): { itemLike: T; collectable: Collectable; rarity: Rarity } {
  if (!itemLike.collectableId) throw new Error("No collectableId on itemLike");
  const collectable = collectables.find((c) => c.id === itemLike.collectableId);
  if (!collectable) throw new Error("Collectable not found:" + itemLike.collectableId);
  const rarity = rarities.find((r) => r.id === collectable.rarity);
  if (!rarity) throw new Error("Rarity not found for collectable " + collectable.id);
  return { itemLike, collectable, rarity };
}

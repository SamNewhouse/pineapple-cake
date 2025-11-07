import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Collectable, HydratedItem, Rarity } from "../../types";

export function useHydratedItems() {
  const items = useSelector((state: RootState) => state.items.items);
  const collectables = useSelector((state: RootState) => state.collectables.collectables);
  const rarities = useSelector((state: RootState) => state.rarities.rarities);

  const ready =
    Boolean(items && collectables && rarities) &&
    items.length > 0 &&
    collectables.length > 0 &&
    rarities.length > 0;

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

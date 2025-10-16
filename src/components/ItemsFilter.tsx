import React from "react";
import { View } from "react-native";
import { Select, SelectItem, Input, useTheme, IndexPath } from "@ui-kitten/components";

interface ItemsFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  rarityFilter: string;
  onRarityChange: (rarity: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const ItemsFilter: React.FC<ItemsFilterProps> = ({
  searchQuery,
  onSearchChange,
  rarityFilter,
  onRarityChange,
  sortBy,
  onSortChange,
}) => {
  const theme = useTheme();
  const rarityOptions = ["All", "Common", "Uncommon", "Rare", "Epic", "Legendary"];
  const sortOptions = ["Name", "Rarity", "Date Found"];

  const handleRaritySelect = (index: IndexPath | IndexPath[]) => {
    const selectedIndex = Array.isArray(index) ? index[0] : index;
    onRarityChange(rarityOptions[selectedIndex.row]);
  };

  const handleSortSelect = (index: IndexPath | IndexPath[]) => {
    const selectedIndex = Array.isArray(index) ? index[0] : index;
    onSortChange(sortOptions[selectedIndex.row]);
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: theme["color-dark"],
      }}
    >
      <Input
        placeholder="Search items..."
        value={searchQuery}
        onChangeText={onSearchChange}
        style={{
          marginBottom: 15,
          backgroundColor: theme["color-darkest"],
          borderColor: theme["color-dark"],
        }}
        textStyle={{
          color: theme["color-text"],
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Select
          style={{
            flex: 0.48,
            backgroundColor: theme["color-darkest"],
            borderColor: theme["color-dark"],
          }}
          placeholder="Rarity"
          value={rarityFilter}
          onSelect={handleRaritySelect}
        >
          {rarityOptions.map((rarity) => (
            <SelectItem key={rarity} title={rarity} />
          ))}
        </Select>

        <Select
          style={{
            flex: 0.48,
            backgroundColor: theme["color-darkest"],
            borderColor: theme["color-dark"],
          }}
          placeholder="Sort by"
          value={sortBy}
          onSelect={handleSortSelect}
        >
          {sortOptions.map((sort) => (
            <SelectItem key={sort} title={sort} />
          ))}
        </Select>
      </View>
    </View>
  );
};

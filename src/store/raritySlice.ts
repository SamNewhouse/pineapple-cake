import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Rarity } from "../types";

interface RarityState {
  rarities: Rarity[];
  loading: boolean;
  error: string | null;
}

const initialState: RarityState = {
  rarities: [],
  loading: false,
  error: null,
};

const raritySlice = createSlice({
  name: "rarities",
  initialState,
  reducers: {
    setRarities(state, action: PayloadAction<Rarity[]>) {
      state.rarities = action.payload;
      state.error = null;
    },
    addRarity(state, action: PayloadAction<Rarity>) {
      state.rarities.push(action.payload);
      state.error = null;
    },
    removeRarity(state, action: PayloadAction<string>) {
      state.rarities = state.rarities.filter((r) => r.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearRarities(state) {
      state.rarities = [];
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setRarities, addRarity, removeRarity, setLoading, setError, clearRarities } =
  raritySlice.actions;

export default raritySlice.reducer;

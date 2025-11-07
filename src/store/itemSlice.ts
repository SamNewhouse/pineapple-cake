import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../types";

interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
    },
    addItem(state, action: PayloadAction<Item>) {
      state.items.unshift(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearItems(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setItems, addItem, removeItem, setLoading, setError, clearItems } =
  itemSlice.actions;

export default itemSlice.reducer;

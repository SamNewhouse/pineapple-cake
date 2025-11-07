// src/store/collectableSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collectable } from "../types";

interface CollectablesState {
  collectables: Collectable[];
  loading: boolean;
  error: string | null;
}

const initialState: CollectablesState = {
  collectables: [],
  loading: false,
  error: null,
};

const collectableSlice = createSlice({
  name: "collectables",
  initialState,
  reducers: {
    setCollectables(state, action: PayloadAction<Collectable[]>) {
      state.collectables = action.payload;
      state.error = null;
    },
    addCollectable(state, action: PayloadAction<Collectable>) {
      state.collectables.push(action.payload);
    },
    removeCollectable(state, action: PayloadAction<string>) {
      state.collectables = state.collectables.filter(
        (c) => c.id !== action.payload
      );
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearCollectables(state) {
      state.collectables = [];
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setCollectables,
  addCollectable,
  removeCollectable,
  setLoading,
  setError,
  clearCollectables,
} = collectableSlice.actions;

export default collectableSlice.reducer;

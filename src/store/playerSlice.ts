import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticatedPlayer } from "../types";

interface PlayerState {
  player: AuthenticatedPlayer | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlayerState = {
  player: null,
  loading: false,
  error: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer(state, action: PayloadAction<AuthenticatedPlayer | null>) {
      state.player = action.payload;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    updateAchievements(state, action: PayloadAction<string[]>) {
      if (state.player) state.player.achievements = action.payload;
    },
    clearPlayer(state) {
      state.player = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setPlayer, setLoading, setError, updateAchievements, clearPlayer } =
  playerSlice.actions;

export default playerSlice.reducer;

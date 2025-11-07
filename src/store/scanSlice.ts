import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScanResult } from "../types";
import { BASE_PROBABILITY, processBarcodeScan } from "../core/functions/scan";

interface ScanState {
  result: ScanResult | null;
  scanning: boolean;
  error: string | null;
  scanHistory: string[];
  unlockProbability: number;
}

const initialState: ScanState = {
  result: null,
  scanning: false,
  error: null,
  scanHistory: [],
  unlockProbability: BASE_PROBABILITY,
};

export const performBarcodeScan = createAsyncThunk<
  ScanResult,
  {
    scanResult: { data: string };
    playerId: string;
    scannerLocked: boolean;
    unlockProbability: number;
  },
  { rejectValue: string }
>("scan/performBarcodeScan", async (params, { rejectWithValue }) => {
  try {
    const result = await processBarcodeScan(params);
    return result;
  } catch (error) {
    return rejectWithValue("Scan failed.");
  }
});

const scanSlice = createSlice({
  name: "scan",
  initialState,
  reducers: {
    startScan(state) {
      state.scanning = true;
      state.error = null;
    },
    endScan(state, action: PayloadAction<ScanResult>) {
      state.scanning = false;
      state.result = action.payload;
      state.scanHistory.unshift(JSON.stringify(action.payload));
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.scanning = false;
    },
    clearResult(state) {
      state.result = null;
      state.error = null;
    },
    clearHistory(state) {
      state.scanHistory = [];
    },
    setUnlockProbability(state, action: PayloadAction<number>) {
      state.unlockProbability = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performBarcodeScan.pending, (state) => {
        state.scanning = true;
        state.error = null;
      })
      .addCase(performBarcodeScan.fulfilled, (state, action) => {
        state.scanning = false;
        state.result = action.payload;
        state.scanHistory.unshift(JSON.stringify(action.payload));
      })
      .addCase(performBarcodeScan.rejected, (state, action) => {
        state.scanning = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { startScan, endScan, setError, clearResult, clearHistory, setUnlockProbability } =
  scanSlice.actions;

export default scanSlice.reducer;

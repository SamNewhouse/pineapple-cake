import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import playerReducer from "./playerSlice";
import itemReducer from "./itemSlice";
import collectableReducer from "./collectableSlice";
import rarityReducer from "./raritySlice";
import scanReducer from "./scanSlice";

const rootReducer = combineReducers({
  player: playerReducer,
  items: itemReducer,
  collectables: collectableReducer,
  rarities: rarityReducer,
  scan: scanReducer,
});

export const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["player", "items", "collectables", "rarity", "scan"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKey } from "../types";

export interface TimedStorageData<T = string> {
  value: T;
  storedAt: number;
  ttl?: number; // milliseconds
}

const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Add data with NO expiry (kept forever unless manually removed)
export async function addData<T>(storageKey: StorageKey, value: T): Promise<void> {
  try {
    const now = Date.now();
    const stored = await AsyncStorage.getItem(storageKey);
    let arr: TimedStorageData<T>[] = stored ? JSON.parse(stored) : [];
    arr.push({ value, storedAt: now });
    await AsyncStorage.setItem(storageKey, JSON.stringify(arr));
    console.log(`[STORAGE.add] "${value}" stored in "${storageKey}".`);
  } catch (e) {
    console.error(`[STORAGE.add] Could not add data "${value}" to "${storageKey}":`, e);
  }
}

// Add data with a TTL (calls addData and then updates TTL field)
export async function addTimedData<T>(storageKey: StorageKey, value: T): Promise<void> {
  try {
    // Use addData to add value and storedAt
    await addData(storageKey, value);

    // Now add the 24h TTL by reloading, updating, and resaving
    const stored = await AsyncStorage.getItem(storageKey);
    let arr: TimedStorageData<T>[] = stored ? JSON.parse(stored) : [];

    // Find the most recent item with our value (that has no TTL yet), update it with TTL
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i].value === value && !arr[i].ttl) {
        arr[i].ttl = DEFAULT_TTL;
        break;
      }
    }
    await AsyncStorage.setItem(storageKey, JSON.stringify(arr));
    console.log(
      `[STORAGE.addTimed] "${value}" in "${storageKey}" now has TTL 24h (${DEFAULT_TTL}ms).`,
    );
  } catch (e) {
    console.error(`[STORAGE.addTimed] Could not add timed data "${value}" to "${storageKey}":`, e);
  }
}

// Remove specific data by value
export async function removeTimedData<T>(storageKey: StorageKey, value: T): Promise<void> {
  try {
    const stored = await AsyncStorage.getItem(storageKey);
    if (!stored) return;
    let arr: TimedStorageData<T>[] = JSON.parse(stored);
    arr = arr.filter((data) => data.value !== value);
    await AsyncStorage.setItem(storageKey, JSON.stringify(arr));
    console.log(`[STORAGE.remove] "${value}" removed from "${storageKey}".`);
  } catch (e) {
    console.error(`[STORAGE.remove] Could not remove data "${value}" from "${storageKey}":`, e);
  }
}

// Clear all data for a storageKey
export async function clearStorage(storageKey: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(storageKey);
    console.log(`[STORAGE.clear] Cleared all data from "${storageKey}".`);
  } catch (e) {
    console.error(`[STORAGE.clear] Could not clear "${storageKey}":`, e);
  }
}

// Prune expired data
function pruneTimedData<T>(arr: TimedStorageData<T>[]): TimedStorageData<T>[] {
  const now = Date.now();
  return arr.filter((data) => now - data.storedAt < (data.ttl || DEFAULT_TTL));
}

// Get all unexpired data
export async function getTimedData<T>(storageKey: StorageKey): Promise<T[]> {
  try {
    const stored = await AsyncStorage.getItem(storageKey);
    if (!stored) return [];
    let arr: TimedStorageData<T>[] = JSON.parse(stored);
    arr = pruneTimedData(arr);
    return arr.map((data) => data.value);
  } catch (e) {
    console.error(`[STORAGE.get] Could not get data from "${storageKey}":`, e);
    return [];
  }
}

// Check if data exists and is unexpired
export async function hasTimedData<T>(storageKey: StorageKey, value: T): Promise<boolean> {
  try {
    const stored = await AsyncStorage.getItem(storageKey);
    if (!stored) return false;
    let arr: TimedStorageData<T>[] = JSON.parse(stored);
    arr = pruneTimedData(arr);
    const exists = arr.some((data) => data.value === value);
    console.log(`[STORAGE.has] "${value}" ${exists ? "found" : "not found"} in "${storageKey}".`);
    return exists;
  } catch (e) {
    console.error(`[STORAGE.has] Could not check data "${value}" in "${storageKey}":`, e);
    return false;
  }
}

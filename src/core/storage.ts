import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStorage } from "../types";
import { log, logError } from "./logging";

// Types
export interface TimedStorageData<T = string> {
  value: T;
  storedAt: number;
  ttl?: number;
}

type StorageKey = LocalStorage | string;
type StorageResult<T> = Promise<T | null>;
type StorageAction = Promise<void>;

// Constants
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Core storage utilities
async function getStorageItem(key: StorageKey): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    logError(`[STORAGE.getItem] Failed to get "${key}":`, error);
    return null;
  }
}

async function setStorageItem(key: StorageKey, value: string): StorageAction {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    logError(`[STORAGE.setItem] Failed to set "${key}":`, error);
    throw error;
  }
}

async function removeStorageItem(key: StorageKey): StorageAction {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    logError(`[STORAGE.removeItem] Failed to remove "${key}":`, error);
    throw error;
  }
}

// JSON parsing utilities
function parseStorageData<T>(data: string | null, defaultValue: T): T {
  if (!data) return defaultValue;
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    logError(`[STORAGE.parse] Invalid JSON data:`, error);
    return defaultValue;
  }
}

function stringifyStorageData<T>(data: T): string {
  try {
    return JSON.stringify(data);
  } catch (error) {
    logError(`[STORAGE.stringify] Failed to stringify data:`, error);
    throw error;
  }
}

// Timed data utilities
function isDataExpired<T>(item: TimedStorageData<T>): boolean {
  const now = Date.now();
  const ttl = item.ttl || DEFAULT_TTL;
  return now - item.storedAt >= ttl;
}

function pruneExpiredData<T>(arr: TimedStorageData<T>[]): TimedStorageData<T>[] {
  return arr.filter((item) => !isDataExpired(item));
}

async function getTimedStorageArray<T>(key: StorageKey): Promise<TimedStorageData<T>[]> {
  const stored = await getStorageItem(key);
  return parseStorageData(stored, [] as TimedStorageData<T>[]);
}

async function setTimedStorageArray<T>(key: StorageKey, arr: TimedStorageData<T>[]): StorageAction {
  const data = stringifyStorageData(arr);
  await setStorageItem(key, data);
}

// Public API - Simple key-value storage
export async function storeData<T>(key: StorageKey, value: T): StorageAction {
  try {
    const data = stringifyStorageData(value);
    await setStorageItem(key, data);
    log(`[STORAGE.store] Data stored in "${key}"`);
  } catch (error) {
    logError(`[STORAGE.store] Could not store data in "${key}":`, error);
    throw error;
  }
}

export async function getData<T>(key: StorageKey): StorageResult<T> {
  try {
    const stored = await getStorageItem(key);
    if (!stored) return null;
    return parseStorageData(stored, null);
  } catch (error) {
    logError(`[STORAGE.get] Could not get data from "${key}":`, error);
    return null;
  }
}

export async function clearStorage(key: StorageKey): StorageAction {
  try {
    await removeStorageItem(key);
    log(`[STORAGE.clear] Cleared all data from "${key}"`);
  } catch (error) {
    logError(`[STORAGE.clear] Could not clear "${key}":`, error);
    throw error;
  }
}

// Public API - Timed array storage
export async function addData<T>(key: StorageKey, value: T): StorageAction {
  try {
    const arr = await getTimedStorageArray<T>(key);
    const newItem: TimedStorageData<T> = {
      value,
      storedAt: Date.now(),
    };
    arr.push(newItem);
    await setTimedStorageArray(key, arr);
    log(`[STORAGE.add] Added data to "${key}"`);
  } catch (error) {
    logError(`[STORAGE.add] Could not add data to "${key}":`, error);
    throw error;
  }
}

export async function addTimedData<T>(
  key: StorageKey,
  value: T,
  ttl: number = DEFAULT_TTL,
): StorageAction {
  try {
    const arr = await getTimedStorageArray<T>(key);
    const newItem: TimedStorageData<T> = {
      value,
      storedAt: Date.now(),
      ttl,
    };
    arr.push(newItem);
    await setTimedStorageArray(key, arr);
    log(`[STORAGE.addTimed] Added timed data to "${key}" with TTL ${ttl}ms`);
  } catch (error) {
    logError(`[STORAGE.addTimed] Could not add timed data to "${key}":`, error);
    throw error;
  }
}

export async function removeTimedData<T>(key: StorageKey, value: T): StorageAction {
  try {
    const arr = await getTimedStorageArray<T>(key);
    const filteredArr = arr.filter((item) => item.value !== value);
    await setTimedStorageArray(key, filteredArr);
    log(`[STORAGE.remove] Removed data from "${key}"`);
  } catch (error) {
    logError(`[STORAGE.remove] Could not remove data from "${key}":`, error);
    throw error;
  }
}

export async function getTimedData<T>(key: StorageKey): Promise<T[]> {
  try {
    const arr = await getTimedStorageArray<T>(key);
    const validArr = pruneExpiredData(arr);

    // Save back the pruned array if items were removed
    if (validArr.length !== arr.length) {
      await setTimedStorageArray(key, validArr);
    }

    return validArr.map((item) => item.value);
  } catch (error) {
    logError(`[STORAGE.get] Could not get timed data from "${key}":`, error);
    return [];
  }
}

export async function hasTimedData<T>(key: StorageKey, value: T): Promise<boolean> {
  try {
    const arr = await getTimedStorageArray<T>(key);
    const validArr = pruneExpiredData(arr);
    const exists = validArr.some((item) => item.value === value);

    log(`[STORAGE.has] "${value}" ${exists ? "found" : "not found"} in "${key}"`);
    return exists;
  } catch (error) {
    logError(`[STORAGE.has] Could not check data in "${key}":`, error);
    return false;
  }
}

// Utility functions for manual cleanup
export async function pruneExpiredStorageData<T>(key: StorageKey): StorageAction {
  try {
    const arr = await getTimedStorageArray<T>(key);
    const validArr = pruneExpiredData(arr);

    if (validArr.length !== arr.length) {
      await setTimedStorageArray(key, validArr);
      log(`[STORAGE.prune] Removed ${arr.length - validArr.length} expired items from "${key}"`);
    }
  } catch (error) {
    logError(`[STORAGE.prune] Could not prune expired data from "${key}":`, error);
    throw error;
  }
}

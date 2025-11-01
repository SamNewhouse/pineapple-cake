import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStorage } from "../types";
import { log, logError } from "./logging";

// Types
export interface TimedStorageData<T = unknown> {
  value: T;
  storedAt: number;
  ttl?: number;
}

type StorageKey = LocalStorage | string;

// Default TTL of 24 hours in milliseconds
const DEFAULT_TTL = 24 * 60 * 60 * 1000;

// Core storage utilities with strict typing
async function getStorageItem(key: StorageKey): Promise<string | null> {
  if (typeof key !== "string" || key.length === 0) {
    logError(`[STORAGE.getItem] Invalid key: "${key}"`);
    throw new Error("getStorageItem called with invalid key.");
  }
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    logError(`[STORAGE.getItem] Failed to get "${key}":`, error);
    return null;
  }
}

async function setStorageItem(key: StorageKey, value: string): Promise<void> {
  if (typeof key !== "string" || key.length === 0 || value === "") {
    logError(`[STORAGE.setItem] Invalid key or empty value: key="${key}"`);
    throw new Error("setStorageItem called with invalid key or empty value.");
  }
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    logError(`[STORAGE.setItem] Failed to set "${key}":`, error);
    throw error;
  }
}

async function removeStorageItem(key: StorageKey): Promise<void> {
  if (typeof key !== "string" || key.length === 0) {
    logError(`[STORAGE.removeItem] Invalid key: "${key}"`);
    throw new Error("removeStorageItem called with invalid key.");
  }
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    logError(`[STORAGE.removeItem] Failed to remove "${key}":`, error);
    throw error;
  }
}

// JSON parsing utilities with generic return typing
function parseStorageData<T>(data: string | null): T | null {
  if (!data) return null;
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    logError(`[STORAGE.parse] Invalid JSON data:`, error);
    return null;
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

// Timed data helpers
function isDataExpired<T>(item: TimedStorageData<T>): boolean {
  const now = Date.now();
  const ttl = item.ttl ?? DEFAULT_TTL;
  return now - item.storedAt >= ttl;
}

function pruneExpiredData<T>(arr: TimedStorageData<T>[]): TimedStorageData<T>[] {
  return arr.filter((item) => !isDataExpired(item));
}

// Timed array storage helpers with strict typing
async function getTimedStorageArray<T>(key: StorageKey): Promise<TimedStorageData<T>[]> {
  const stored = await getStorageItem(key);
  const parsed = parseStorageData<TimedStorageData<T>[]>(stored);
  return parsed ?? [];
}

async function setTimedStorageArray<T>(key: StorageKey, arr: TimedStorageData<T>[]): Promise<void> {
  const data = stringifyStorageData(arr);
  await setStorageItem(key, data);
}

// Public API

export async function storeData<T>(key: StorageKey, value: T): Promise<void> {
  if (typeof key !== "string" || key.length === 0 || value === null || value === undefined) {
    logError(`[STORAGE.storeData] Invalid key/value: key="${key}" value="${value}"`);
    throw new Error("storeData called with invalid key or value.");
  }
  const data = stringifyStorageData(value);
  await setStorageItem(key, data);
  log(`[STORAGE.storeData] Data stored in "${key}"`);
}

export async function getData<T>(key: StorageKey): Promise<T | null> {
  const stored = await getStorageItem(key);
  if (!stored) return null;
  return parseStorageData<T>(stored);
}

export async function clearStorage(key: StorageKey): Promise<void> {
  await removeStorageItem(key);
  log(`[STORAGE.clearStorage] Cleared data from "${key}"`);
}

export async function addData<T>(key: StorageKey, value: T): Promise<void> {
  const arr = await getTimedStorageArray<T>(key);
  const newItem: TimedStorageData<T> = { value, storedAt: Date.now() };
  arr.push(newItem);
  await setTimedStorageArray(key, arr);
  log(`[STORAGE.addData] Added data to "${key}"`);
}

export async function addTimedData<T>(
  key: StorageKey,
  value: T,
  ttl: number = DEFAULT_TTL,
): Promise<void> {
  const arr = await getTimedStorageArray<T>(key);
  const newItem: TimedStorageData<T> = { value, storedAt: Date.now(), ttl };
  arr.push(newItem);
  await setTimedStorageArray(key, arr);
  log(`[STORAGE.addTimedData] Added timed data to "${key}" with TTL ${ttl}ms`);
}

export async function removeTimedData<T>(key: StorageKey, value: T): Promise<void> {
  const arr = await getTimedStorageArray<T>(key);
  const filteredArr = arr.filter((item) => JSON.stringify(item.value) !== JSON.stringify(value));
  await setTimedStorageArray(key, filteredArr);
  log(`[STORAGE.removeTimedData] Removed data from "${key}"`);
}

export async function getTimedData<T>(key: StorageKey): Promise<T[]> {
  const arr = await getTimedStorageArray<T>(key);
  const validArr = pruneExpiredData(arr);
  if (validArr.length !== arr.length) {
    await setTimedStorageArray(key, validArr);
    log(`[STORAGE.getTimedData] Pruned expired data from "${key}"`);
  }
  return validArr.map((item) => item.value);
}

export async function hasTimedData<T>(key: StorageKey, value: T): Promise<boolean> {
  const arr = await getTimedStorageArray<T>(key);
  const validArr = pruneExpiredData(arr);
  const exists = validArr.some((item) => JSON.stringify(item.value) === JSON.stringify(value));
  log(`[STORAGE.hasTimedData] "${exists ? "found" : "not found"}" value in "${key}"`);
  return exists;
}

export async function pruneExpiredStorageData<T>(key: StorageKey): Promise<void> {
  const arr = await getTimedStorageArray<T>(key);
  const validArr = pruneExpiredData(arr);
  if (validArr.length !== arr.length) {
    await setTimedStorageArray(key, validArr);
    log(
      `[STORAGE.pruneExpiredStorageData] Removed ${arr.length - validArr.length} expired items from "${key}"`,
    );
  }
}

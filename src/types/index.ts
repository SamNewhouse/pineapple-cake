export type Screen = "home" | "scan" | "items" | "trade" | "settings";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export interface HttpRequestOptions {
  url: string;
  method?: HttpMethod;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface HttpRequestError {
  message: string;
  status?: number;
  data?: any;
  isAxiosError?: boolean;
}

export enum LocalStorage {
  BARCODE = "barcode",
  PLAYER = "player",
  SETTING = "setting",
  RARITIES = "rarities",
  COLLECTABLES = "collectables",
}

export enum Tables {
  Items = "Items",
  Collectables = "Collectables",
  Players = "Players",
  Trades = "Trades",
  Rarities = "Rarities",
  Achievements = "Achievements",
}

export interface Item {
  id: string;
  playerId: string;
  collectableId: string;
  quality: number;
  chance: number;
  foundAt: string;
}

export interface Collectable {
  id: string;
  name: string;
  description: string;
  rarity: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Rarity {
  id: string;
  name: string;
  minChance: number;
  maxChance: number;
  color: string;
}

export interface HydratedItem {
  item: Item;
  collectable: Collectable;
  rarity: Rarity;
}

export enum TradeStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export interface Trade {
  id: string;
  fromPlayerId: string;
  toPlayerId: string;
  offeredItemIds: string[];
  requestedItemIds: string[];
  status: TradeStatus;
  createdAt: string;
  resolvedAt?: string;
}

export interface Player {
  id: string;
  email: string;
  username: string;
  totalScans: number;
  createdAt: string;
  passwordHash: string;
  achievements?: string[];
}

export interface AuthenticatedPlayer extends Omit<Player, "passwordHash"> {
  token: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  createdAt: string;
}

export interface AwardedItem extends Collectable {
  collectableId: string;
}

export interface ScanResult {
  awardedItem?: AwardedItem;
  playerId?: string;
  foundAt?: string;
  error?: any;
}

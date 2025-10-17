import { EXPO_PUBLIC_STAGE } from "./variables";

export function log(...args: any[]) {
  if (EXPO_PUBLIC_STAGE === "dev") {
    console.log(...args);
  }
}

export function logError(...args: any[]) {
  if (EXPO_PUBLIC_STAGE === "dev") {
    console.error(...args);
  }
}

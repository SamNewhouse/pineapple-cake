import { STAGE } from "react-native-dotenv";

export function log(...args: any[]) {
  if (STAGE === "dev") {
    console.log(...args);
  }
}

export function logError(...args: any[]) {
  if (STAGE === "dev") {
    console.error(...args);
  }
}

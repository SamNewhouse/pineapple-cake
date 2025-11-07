export function log(...args: any[]) {
  if (__DEV__) {
    console.log(...args);
  }
}

export function logError(...args: any[]) {
  if (__DEV__) {
    console.error(...args);
  }
}

import { log } from "../lib/logging";

/**
 * Waits a random delay between minMs and maxMs, but if the promise takes longer, waits for promise.
 * The loader is always visible for at least the random delay, but never hides until promise resolves.
 * Logs the loader delay and total time.
 */
export async function waitRandomDelayUntilDone<T>(
  promise: Promise<T>,
  minMs: number,
  maxMs: number,
): Promise<T> {
  const chosenDelay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  const start = Date.now();

  let resolved = false;
  let value: T;
  let error: any;

  promise
    .then((v) => {
      value = v;
      resolved = true;
    })
    .catch((e) => {
      error = e;
      resolved = true;
    });

  await new Promise((resolve) => setTimeout(resolve, chosenDelay));

  while (!resolved) {
    await new Promise((r) => setTimeout(r, 16));
  }

  const totalElapsed = Date.now() - start;
  log(`[LOADER.delay] Loader delay: ${chosenDelay}ms | Total wait: ${totalElapsed}ms`);

  if (error) throw error;
  return value!;
}

import axios, { AxiosInstance, AxiosError } from "axios";
import { AuthenticatedPlayer, HttpRequestError, HttpRequestOptions, LocalStorage } from "../types";
import { EXPO_PUBLIC_URL } from "../config/variables";
import { logError, log } from "./logging";
import { getData } from "./storage";

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: EXPO_PUBLIC_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

// Add async interceptor for Authorization header
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const player: AuthenticatedPlayer | null = await getData(LocalStorage.PLAYER);
      if (player && player.token && config.headers) {
        config.headers.Authorization = `Bearer ${player.token}`;
      }
    } catch (error) {
      logError("[HTTP.interceptor] Failed to get token", error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle 401 responses (token expired or invalid)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      logError("[HTTP.response] Unauthorized – token may be expired");
      // Token refresh or logout flow could go here
    }
    return Promise.reject(error);
  },
);

// Unified request function with nested data fix
export async function httpRequest<T = any>(options: HttpRequestOptions): Promise<T> {
  const { url, method = "get", data, params, headers, timeout } = options;

  try {
    const response = await apiClient.request({
      url,
      method,
      data,
      params,
      headers,
      timeout,
    });

    const finalData = response.data?.data ?? response.data;

    return finalData;
  } catch (error) {
    const err: HttpRequestError = {
      message: "Unknown error",
    };

    if (axios.isAxiosError(error)) {
      err.isAxiosError = true;
      err.message = (error as AxiosError).message;
      err.status = (error as AxiosError).response?.status;
      err.data = (error as AxiosError).response?.data;

      log("[HTTP.error]", { url, status: err.status, data: err.data });
    } else if (error instanceof Error) {
      err.message = error.message;
    }

    logError("[HTTP.error]", err);
    throw err;
  }
}

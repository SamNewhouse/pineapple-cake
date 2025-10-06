import axios, { AxiosError } from "axios";
import { HttpMethod } from "../types";

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

export async function httpRequest<T = any>(options: HttpRequestOptions): Promise<T> {
  const { url, method = "get", data, params, headers, timeout = 5000 } = options;

  try {
    console.log("[HTTP.request]", { url, method, params, data });
    const response = await axios({
      url,
      method,
      data,
      params,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      timeout,
    });
    console.log("[HTTP.response]", { url, status: response.status, data: response.data });
    return response.data;
  } catch (error) {
    const err: HttpRequestError = { message: "Unknown error" };
    if (axios.isAxiosError(error)) {
      err.isAxiosError = true;
      err.message = (error as AxiosError).message;
      err.status = (error as AxiosError).response?.status;
      err.data = (error as AxiosError).response?.data;
      console.log("[HTTP.error]", { url, status: err.status, data: err.data });
    } else if (error instanceof Error) {
      err.message = error.message;
    }
    console.error("[HTTP.error]", err);
    throw err;
  }
}

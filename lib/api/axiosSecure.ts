"use client";

import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const apiSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiSecure.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const method = config.method?.toUpperCase() ?? "";

    if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      let csrfToken = Cookies.get("csrf_token");

      if (!csrfToken) {
        try {
          const res = await axios.get<{ csrfToken: string }>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/csrf`,
            { withCredentials: true }
          );
          csrfToken = res.data?.csrfToken;
          if (csrfToken) Cookies.set("csrf_token", csrfToken);
        } catch {
          /* Silent fail */
        }
      }

      if (csrfToken) config.headers["x-csrf-token"] = csrfToken;
    }
    return config;
  }
);

// Generic function hỗ trợ nhắc lệnh (Intellisense) tốt hơn
export async function requestSecure<TResponse = unknown, TData = unknown>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: TData,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const response = await apiSecure.request<TResponse>({
    method,
    url,
    data,
    ...config,
  });
  return response.data;
}

"use client";

import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export const apiSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Chúng ta chỉ giữ lại instance để gửi kèm Cookie là đủ

export async function requestSecure<TResponse = unknown, TData = unknown>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: TData,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  const response = await apiSecure.request<TResponse>({
    method,
    url,
    data,
    ...config,
  });
  return response.data;
}

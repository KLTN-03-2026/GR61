import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Quan trọng để gửi/nhận HttpOnly Cookies
});

/**
 * fetcher<T>: Hàm generic chuyên dùng cho SWR (chỉ GET dữ liệu)
 * Thay vì <T = any>, ta để <T> để bắt buộc hoặc gợi ý kiểu dữ liệu khi gọi
 */
export async function fetcher<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await api.get<T>(url, config);
  return response.data;
}

/**
 * request<T>: Hàm generic dùng cho mọi phương thức (POST, PUT, DELETE, PATCH)
 * data?: unknown thay vì any để đảm bảo tính an toàn dữ liệu đầu vào
 */
export async function request<T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await api.request<T>({
    method,
    url,
    data,
    ...config,
  });
  return response.data;
}

// Export mặc định instance để sử dụng interceptors nếu cần sau này
export default api;

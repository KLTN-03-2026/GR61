"use client";
// Đây là “bộ nhớ tạm trung tâm” (state management layer) cho toàn bộ ứng dụng
// mọi component có thể đọc/truy cập hoặc thay đổi thông tin người dùng
// mà không cần truyền props qua lại.
import { create } from "zustand";

interface AuthState {
  // login
  // state login
  formData: { email: string; password: string };
  error: string;
  loading: boolean;
  // hàm xử lý cho login
  setFormData: (data: Partial<{ email: string; password: string }>) => void;
  // setFormData là một hàm nhận đối số data,
  // và data có thể là một phần của form, chứ không cần đầy đủ.
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;

  // register
  // state register
  registerData: { hoTen: string; email: string; password: string };
  // hàm xử lý register
  setRegisterData: (
    data: Partial<{ hoTen: string; email: string; password: string }>
  ) => void;
}
// tạo store zustand
export const useAuthStore = create<AuthState>((set) => ({
  formData: { email: "", password: "" },
  error: "",
  loading: false,
  registerData: { hoTen: "", email: "", password: "" },

  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),

  setRegisterData: (data) =>
    set((state) => ({
      registerData: { ...state.registerData, ...data },
    })),
}));

"use client";

import { useRouter } from "next/navigation";
import { request } from "@/lib/api/axiosPublic";
import { useAuthStore } from "@/stores/auth.store";

export function useRegister() {
  const router = useRouter();
  const {
    registerData,
    error,
    loading,
    setRegisterData,
    setError,
    setLoading,
  } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.hoTen || !registerData.email || !registerData.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setLoading(true);
    try {
      const res = await request("POST", "/api/auth/register", registerData);
      alert(res.message || "Đăng ký thành công");
      router.push("/auth/login");
    } catch {
      alert("Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData: registerData,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
}
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { request } from "@/lib/api/axiosPublic";

// interface RegisterForm {
//   hoTen: string;
//   email: string;
//   password: string;
// }

// export function useRegister() {
//   const [formData, setFormData] = useState<RegisterForm>({
//     hoTen: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   // Đây là hàm xử lý khi người dùng nhập dữ liệu vào ô input (onChange).
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // prev là state formData hiện tại (trước khi nhập mới).
//     // Dấu ...prev sao chép toàn bộ dữ liệu cũ (spread operator).
//     // [e.target.name]: tên của input (ví dụ "email" hoặc "password").
//     // e.target.value: giá trị mà người dùng vừa nhập.
//     setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
//     if (error) setError("");
//   };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.hoTen || !formData.email || !formData.password) {
//       setError("Vui lòng nhập đya đủ thông tin");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await request("POST", "/api/auth/register", formData);
//       alert(res.message || "Đăng ký thành công");
//       router.push("/auth/login");
//     } catch (error) {
//       alert("Đăng ký thất bại");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return {
//     formData,
//     error,
//     loading,
//     handleChange,
//     handleSubmit,
//   };
// }

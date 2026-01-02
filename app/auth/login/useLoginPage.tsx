// "use client";

// import { useRouter } from "next/navigation";
// import { useAxios } from "./useAxios";
// import { useAuthStore } from "../stores/auth.store";

// export function useLoginPage() {
//   const router = useRouter();
//   const { fetchData, loading } = useAxios<{
//     message: string;
//     vaiTro: "Admin" | "ToChuc" | "TinhNguyenVien";
//     accessToken: string;
//   }>();
//   const { formData, error, setFormData, setError, setLoading } = useAuthStore();
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ [e.target.name]: e.target.value });
//     if (error) setError("");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       setError("Vui lòng nhập đầy đủ thông tin");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetchData("POST", "/api/auth/login", formData);
//       if (!res) return;
//       localStorage.setItem("access_token", res.accessToken);
//       alert(res?.message || "Đăng nhập thành công");

//       const role = res?.vaiTro;
//       if (role === "Admin") router.push("/giaodien/admin");
//       else if (role === "ToChuc") router.push("/giaodien/tochuc");
//       else if (role === "TinhNguyenVien")
//         router.push("/giaodien/tinhnguyenvien");
//       else router.push("/giaodien/403");
//     } catch {
//       setError("Sai email hoặc mật khẩu");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { formData, error, loading, handleChange, handleSubmit };
// }

// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { useAxios } from "./useAxios";

// // interface LoginForm {
// //   email: string;
// //   password: string;
// // }

// // export function useLoginPage() {
// //   const [formData, setFormData] = useState<LoginForm>({
// //     email: "",
// //     password: "",
// //   });
// //   const [error, setError] = useState("");
// //   const router = useRouter();
// //   const { fetchData, loading } = useAxios<{
// //     message: string;
// //     vaiTro: "Admin" | "ToChuc" | "TinhNguyenVien";
// //     accessToken: string;
// //   }>();

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// //     if (error) setError("");
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!formData.email || !formData.password) {
// //       setError("Vui lòng nhập đầy đủ thông tin");
// //       return;
// //     }

// //     try {
// //       const res = await fetchData("POST", "/api/auth/login", formData);
// //       if (!res) return;
// //       localStorage.setItem("access_token", res.accessToken);
// //       alert(res?.message || "Đăng nhập thành công");
// //       const role = res?.vaiTro;

// //       if (role === "Admin") router.push("/giaodien/admin");
// //       else if (role === "ToChuc") router.push("/giaodien/tochuc");
// //       else if (role === "TinhNguyenVien")
// //         router.push("/giaodien/tinhnguyenvien");
// //       else router.push("/giaodien/403");
// //     } catch {
// //       setError("Sai email hoặc mật khẩu");
// //     }
// //   };

// //   return { formData, error, loading, handleChange, handleSubmit };
// // }

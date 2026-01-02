// "use client";
// import React from "react";

// interface Props {
//   formData: { email: string; password: string };
//   error: string;
//   loading: boolean;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSubmit: (e: React.FormEvent) => void;
// }

// export function LoginForm({
//   formData,
//   error,
//   loading,
//   onChange,
//   onSubmit,
// }: Props) {
//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-white">
//       <img
//         src="/anh1.jpg"
//         alt="background"
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       <div className="relative z-10 flex items-center justify-center w-full h-full opacity-95">
//         <div className="bg-[rgb(226,221,192)] bg-opacity-60 p-10 rounded-lg w-[400px] shadow-xl">
//           <h1 className="text-4xl font-bold text-[rgb(183,172,109)] mb-8 text-center">
//             Đăng nhập
//           </h1>

//           {error && (
//             <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded mb-4 text-red-100 text-center">
//               {error}
//             </div>
//           )}

//           <form onSubmit={onSubmit} className="flex flex-col gap-4">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={onChange}
//               placeholder="Email"
//               className="p-4 rounded bg-[rgb(207,198,149)] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(124,111,37)]"
//             />

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={onChange}
//               placeholder="Mật khẩu"
//               className="p-4 rounded bg-[rgb(207,198,149)] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(124,111,37)]"
//             />

//             <a
//               href="#"
//               className="flex justify-center ml-2 mt-[-5px] text-[rgb(150,138,68)] hover:text-[rgb(121,110,49)] hover:underline"
//             >
//               Quên mật khẩu ?
//             </a>

//             <button
//               type="submit"
//               disabled={loading}
//               className="mt-4 bg-[rgb(150,138,68)] hover:bg-[rgb(154,144,91)] text-white font-semibold py-3 rounded disabled:opacity-50"
//             >
//               {loading ? "Đang đăng nhập..." : "Đăng nhập"}
//             </button>
//           </form>

//           <p className="mt-8 text-gray-400 text-center text-sm">
//             Chưa có tài khoản?{" "}
//             <a
//               className="text-[rgb(138,130,84)] hover:underline"
//               href="/auth/register"
//             >
//               Đăng ký ngay
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

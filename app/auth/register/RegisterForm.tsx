"use client";

interface Props {
  formData: { hoTen: string; email: string; password: string };
  error: string;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function RegisterForm({
  formData,
  error,
  loading,
  onChange,
  onSubmit,
}: Props) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <img
        src="/anh1.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="bg-[rgb(202,177,101)] bg-opacity-60 p-10 rounded-lg w-[400px] opacity-95 shadow-xl">
          <h1 className="text-6xl font-bold text-white mb-8 text-center drop-shadow-md">
            Đăng ký
          </h1>

          {error && (
            <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded mb-4 text-white text-center">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="hoTen"
              value={formData.hoTen}
              onChange={onChange}
              placeholder="Họ và tên"
              className="p-4 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(124,111,37)]"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Email"
              className="p-4 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(124,111,37)]"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Mật khẩu"
              className="p-4 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgb(124,111,37)]"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[rgb(125,105,44)] hover:bg-[rgb(155,134,72)] text-white font-semibold py-3 rounded disabled:opacity-50 transition duration-200"
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <p className="mt-8 text-black text-center text-sm">
            Đã có tài khoản?{" "}
            <a
              className="text-white hover:underline hover:text-gray-200"
              href="/auth/login"
            >
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

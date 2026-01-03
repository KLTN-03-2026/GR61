// @/app/auth/login/page.tsx
"use client";

import { LoginForm } from "./LoginForm";
import { useLoginPage } from "./useLoginPage";

export default function LoginPage() {
  const { formData, error, loading, handleChange, handleSubmit } =
    useLoginPage();

  return (
    <LoginForm
      formData={formData}
      error={error}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

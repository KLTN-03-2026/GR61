"use client";

import { useLoginPage } from "./useLoginPage";
import { LoginForm } from "./LoginForm";

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

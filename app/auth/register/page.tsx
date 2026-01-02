"use client";
import { RegisterForm } from "./RegisterForm";
import { useRegister } from "./useRegisterPage";

export default function RegisterPage() {
  const { formData, error, loading, handleChange, handleSubmit } =
    useRegister();
  return (
    <RegisterForm
      formData={formData}
      error={error}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

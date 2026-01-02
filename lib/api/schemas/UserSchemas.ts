import { z } from "zod";

export const VaiTroEnum = z.enum(["HocVien", "Admin"]);

export const CreateUserSchema = z.object({
  hoTen: z.string().min(2, "Họ tên tối thiểu 2 ký tự"),
  email: z.string().email("Email không hợp lệ").nullable().optional(),
  sdt: z.string().min(9, "Số điện thoại không hợp lệ").nullable().optional(),
  ngaySinh: z.coerce.date().nullable().optional(),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  vaiTro: VaiTroEnum,
});

export const UpdateUserSchema = CreateUserSchema.partial();

// Export type để sử dụng trong Service/Controller
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

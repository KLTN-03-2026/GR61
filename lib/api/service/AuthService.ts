import { UserRepository } from "../repositories/UserRepository";
import { jwtService } from "./jwt.service";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client"; 
import { CreateUserDto } from "../schemas/UserSchemas";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: CreateUserDto): Promise<User | null> {
    if (data.email) {
      const existing = await this.userRepository.findByEmail(data.email);
      if (existing) return null;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Dùng string trực tiếp thay vì Enum để tránh lỗi "undefined"
    const targetRole = data.vaiTro || "HocVien"; 

    const createData = {
      hoTen: data.hoTen,
      email: data.email ?? null,
      password: hashedPassword,
      vaiTro: targetRole,

      // Kiểm tra bằng chuỗi "HocVien"
      ...(targetRole === "HocVien" && {
        hocvien: { create: {} },
      }),
      // Kiểm tra bằng chuỗi "Admin"
      ...(targetRole === "Admin" && {
        admin: { create: {} },
      }),
    };

    return this.userRepository.create(createData as any);
  }

  async login(email: string, pass: string) {
    const userResult = await this.userRepository.findByEmail(email);
    if (!userResult || !userResult.password) return null;

    const isMatch = await bcrypt.compare(pass, userResult.password);
    if (!isMatch) return null;

    const accessToken = jwtService.signAccessToken({
      userId: userResult.id,
      email: userResult.email ?? "",
      vaiTro: userResult.vaiTro,
    });

    return {
      accessToken,
      refreshToken: jwtService.signRefreshToken({ userId: userResult.id }),
      user: {
        id: userResult.id,
        email: userResult.email,
        hoTen: userResult.hoTen,
        vaiTro: userResult.vaiTro,
      },
    };
  }
}
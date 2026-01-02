// @/lib/api/service/AuthService.ts
import { UserRepository } from "../repositories/UserRepository";
import { jwtService } from "./jwt.service";
import bcrypt from "bcryptjs";
import { VaiTro, User } from "@prisma/client";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: number; email: string | null; hoTen: string; vaiTro: VaiTro };
}

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: {
    hoTen: string;
    email: string;
    password: string;
  }): Promise<User | null> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) return null;

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepository.create({
      hoTen: data.hoTen,
      email: data.email,
      password: hashedPassword,
      vaiTro: VaiTro.HocVien, // Mặc định là HocVien theo Schema của bạn
    });
  }

  async login(email: string, pass: string): Promise<LoginResponse | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.password) return null;

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;

    const accessToken = jwtService.signAccessToken({
      userId: user.id,
      email: user.email ?? "",
      vaiTro: user.vaiTro,
    });

    const refreshToken = jwtService.signRefreshToken({ userId: user.id });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        hoTen: user.hoTen,
        vaiTro: user.vaiTro,
      },
    };
  }
}

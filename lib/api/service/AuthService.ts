import { UserRepository } from "../repositories/UserRepository";
import { jwtService } from "./jwt.service";
import bcrypt from "bcryptjs";
import { user_vaiTro, user } from "@prisma/client";
import { CreateUserDto } from "../schemas/UserSchemas";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: CreateUserDto): Promise<user | null> {
    if (data.email) {
      const existing = await this.userRepository.findByEmail(data.email);
      if (existing) return null;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const createData = {
      hoTen: data.hoTen,
      email: data.email ?? null,
      password: hashedPassword,
      vaiTro: data.vaiTro || user_vaiTro.HocVien,

      // Dùng hocvien (viết thường) khớp với Schema
      ...((data.vaiTro || user_vaiTro.HocVien) === user_vaiTro.HocVien && {
        hocvien: { create: {} },
      }),
      ...(data.vaiTro === user_vaiTro.Admin && {
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

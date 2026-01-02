// @/lib/api/repositories/UserRepository.ts
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BaseRepository, PrismaDelegate } from "../base/BaseRepository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(prisma.user as unknown as PrismaDelegate<User>);
  }

  // Bổ sung phương thức riêng để tìm User bằng Email
  async findByEmail(email: string): Promise<User | null> {
    return this.model.findUnique({
      // Dùng Record<string, unknown> để khớp với định nghĩa Interface ở Base
      where: { email } as Record<string, unknown>,
    });
  }
}

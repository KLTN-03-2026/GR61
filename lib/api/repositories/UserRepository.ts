import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BaseRepository, PrismaDelegate } from "../base/BaseRepository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    // Ép kiểu về prisma.user (viết thường)
    super(prisma.user as unknown as PrismaDelegate<User>);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findUnique({
      where: { email } as any,
    });
  }
}

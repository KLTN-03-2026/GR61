import { user } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BaseRepository, PrismaDelegate } from "../base/BaseRepository";

export class UserRepository extends BaseRepository<user> {
  constructor() {
    // Ép kiểu về prisma.user (viết thường)
    super(prisma.user as unknown as PrismaDelegate<user>);
  }

  async findByEmail(email: string): Promise<user | null> {
    return this.model.findUnique({
      where: { email } as any,
    });
  }
}

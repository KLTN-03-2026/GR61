// @/lib/api/repositories/DocumentRepository.ts
import { document } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { BaseRepository, PrismaDelegate } from "../base/BaseRepository";

export class DocumentRepository extends BaseRepository<document> {
  constructor() {
    super(prisma.document as unknown as PrismaDelegate<document>);
  }

  async findByUserId(userId: number): Promise<document[]> {
    // Ép kiểu 'as any' để TypeScript cho phép dùng orderBy mà không lỗi
    return (this.model as any).findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
  async delete(id: number) {
    // Dùng deleteMany để tránh lỗi "Record to delete does not exist" của Prisma
    return (this.model as any).deleteMany({
      where: { id },
    });
  }
}

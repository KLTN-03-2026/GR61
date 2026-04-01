import { prisma } from "@/lib/prisma";
import { BaseRepository, PrismaDelegate } from "../base/BaseRepository";
import { Document } from "@prisma/client";

export class DocumentRepository extends BaseRepository<Document> {
  constructor() {
    super(prisma.document as unknown as PrismaDelegate<Document>);
  }

  async findByUserId(userId: number): Promise<Document[]> {
    // Ép kiểu 'as any' để TypeScript cho phép dùng orderBy mà không lỗi
    return (this.model as any).findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
  async delete(id: number) {
    return (this.model as any).deleteMany({
      where: { id },
    });
  }
}

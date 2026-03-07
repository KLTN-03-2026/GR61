import { prisma } from "@/lib/prisma";

export class FlashcardRepository {
  // Lấy lịch sử làm bài của User, kèm tên Folder để hiển thị
  async getHistory(userId: number) {
    return await prisma.flashcardhistory.findMany({
      where: { userId },
      include: {
        folder: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" }, // Mới nhất hiện lên đầu
    });
  }
  async findByFolder(folderId: number) {
    return await prisma.flashcard.findMany({ where: { folderId } });
  }

  async create(data: any) {
    return await prisma.flashcard.create({ data });
  }

  async update(id: number, data: any) {
    return await prisma.flashcard.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await prisma.flashcard.delete({ where: { id } });
  }
  async updateFolder(id: number, name: string) {
    return await prisma.flashcardfolder.update({
      where: { id },
      data: { name },
    });
  }

  async deleteFolder(id: number) {
    return await prisma.flashcardfolder.delete({
      where: { id },
    });
  }
}

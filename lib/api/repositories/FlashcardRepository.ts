import { prisma } from "@/lib/prisma";

export class FlashcardRepository {

  async getHistory(userId: number) {
    return await prisma.flashcardHistory.findMany({
      where: { userId },
      include: {
        folder: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" }, 
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
    return await prisma.flashcardFolder.update({
      where: { id },
      data: { 
        name: name 
      },
    });
  }

  async deleteFolder(id: number) {
    return await prisma.flashcardFolder.delete({
      where: { id },
    });
  }
}
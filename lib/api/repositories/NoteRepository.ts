import { Note } from "@prisma/client";
import { BaseRepository } from "../base/BaseRepository";
import { prisma } from "@/lib/prisma";

export class NoteRepository extends BaseRepository<Note> {
  constructor() {
    super(prisma.note as any);
  }

  async findByUserId(userId: number) {
    return prisma.note.findMany({
      where: { userId },
      orderBy: [{ isPinned: "desc" }, { updatedAt: "desc" }],
    });
  }
}

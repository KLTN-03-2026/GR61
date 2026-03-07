import { FlashcardRepository } from "../repositories/FlashcardRepository";

const repo = new FlashcardRepository();

export class FlashcardService {
  // Thuật toán xáo trộn Fisher-Yates chuyên nghiệp
  shuffleCards(cards: any[]) {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async getCardsByFolder(folderId: number) {
    return await repo.findByFolder(folderId);
  }

  async saveCard(data: any) {
    const { id, ...rest } = data;
    return id ? await repo.update(id, rest) : await repo.create(rest);
  }

  async removeCard(id: number) {
    return await repo.delete(id);
  }
  async renameFolder(id: number, newName: string) {
    return await repo.updateFolder(id, newName);
  }

  async removeFolder(id: number) {
    return await repo.deleteFolder(id);
  }
}

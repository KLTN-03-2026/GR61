import { DocumentRepository } from "../repositories/DocumentRepository";

export class DocumentService {
  private documentRepo = new DocumentRepository();

  async getDocs(userId: number) {
    return this.documentRepo.findByUserId(userId);
  }

  async createDoc(data: any) {
    // data: title, fileUrl, fileType, fileSize, userId
    return this.documentRepo.create(data);
  }

  async deleteDoc(id: number) {
    return this.documentRepo.delete(id);
  }

  async getDocById(id: number) {
    return this.documentRepo.findById(id);
  }
}

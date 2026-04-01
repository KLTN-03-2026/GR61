import { Note } from "@prisma/client";
import { BaseService } from "../base/BaseService";
import { NoteRepository } from "../repositories/NoteRepository";

export class NoteService extends BaseService<Note> {
  private noteRepo: NoteRepository;

  constructor() {
    const repo = new NoteRepository();
    super(repo);
    this.noteRepo = repo;
  }

  getByUserId(userId: number) {
    return this.noteRepo.findByUserId(userId);
  }
}

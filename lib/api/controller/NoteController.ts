import { NextRequest, NextResponse } from "next/server";
import { Note } from "@prisma/client";
import { BaseController } from "../base/BaseController";
import { NoteService } from "../service/NoteService";

export class NoteController extends BaseController<Note> {
  private noteService: NoteService;

  constructor() {
    const service = new NoteService();
    super(service);
    this.noteService = service;
  }

  getByUser = async (req: NextRequest): Promise<NextResponse> => {
    try {
      const userId = parseInt(req.headers.get("x-user-id") || "0");
      if (!userId)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

      const notes = await this.noteService.getByUserId(userId);
      return NextResponse.json(notes);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  };

  createNote = async (req: NextRequest): Promise<NextResponse> => {
    try {
      const userId = parseInt(req.headers.get("x-user-id") || "0");
      if (!userId)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

      const data = await req.json();
      const result = await this.noteService.create({ ...data, userId });
      return NextResponse.json(result);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  };
}

export const noteController = new NoteController();

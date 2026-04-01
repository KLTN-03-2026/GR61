import { NextRequest } from "next/server";
import { noteController } from "@/lib/api/controller/NoteController";

export async function GET(req: NextRequest) {
  return noteController.getByUser(req);
}

export async function POST(req: NextRequest) {
  return noteController.createNote(req);
}

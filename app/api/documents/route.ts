import { NextRequest, NextResponse } from "next/server";
import { DocumentService } from "@/lib/api/service/DocumentService";

const service = new DocumentService();

export async function GET(req: NextRequest) {
  try {
    const userIdStr = req.headers.get("x-user-id");
    if (!userIdStr)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const docs = await service.getDocs(parseInt(userIdStr));
    return NextResponse.json(docs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userIdStr = req.headers.get("x-user-id");
    if (!userIdStr)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    // Lưu vào database qua Service
    const newDoc = await service.createDoc({
      ...body,
      userId: parseInt(userIdStr),
    });

    return NextResponse.json(newDoc, { status: 201 });
  } catch (error: any) {
    console.error("Lỗi POST Documents:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

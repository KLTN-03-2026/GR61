import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const type = searchParams.get("type")?.toUpperCase();
  let name = searchParams.get("name");
  if (name) {
    name = name.normalize("NFC").trim();
  }

  try {
    const andConditions: any[] = [];

    // 1. Lọc theo ngày
    if (start && end) {
      andConditions.push({
        createdAt: {
          gte: new Date(new Date(start).setHours(0, 0, 0, 0)),
          lte: new Date(new Date(end).setHours(23, 59, 59, 999)),
        },
      });
    }

    // 2. Lọc theo Tên hoặc Chi tiết (XÓA mode: 'insensitive' để hết lỗi 500)
    if (name) {
      andConditions.push({
        OR: [{ userName: { contains: name } }, { detail: { contains: name } }],
      });
    }

    if (type && type !== "ALL" && type !== "") {
      if (type === "DOCUMENT") {
        andConditions.push({
          OR: [
            { action: { contains: "TÀI LIỆU" } },
            { action: { contains: "document", mode: 'insensitive' } },
            { table: { contains: "document", mode: 'insensitive' } },
            { detail: { contains: "tài liệu", mode: 'insensitive' } },
            { type: { contains: "document", mode: 'insensitive' } }
          ],
        });
      } else if (type === "NOTE") {
        andConditions.push({
          table: "note",
          NOT: [
            { action: { contains: "THẺ" } },
            { detail: { contains: "thẻ" } },
          ],
        });
      } else if (type === "FLASHCARD") {
        andConditions.push({
          OR: [
            { table: "Flashcard" },
            { table: "FlashcardFolder" },
            { table: "flashcard" },
            { action: { contains: "THẺ" } },
            { action: { contains: "FLASHCARD" } },
          ],
          NOT: { table: "note" },
        });
      } else if (type === "TODO") {
        andConditions.push({
          OR: [{ table: "todo" }, { action: { contains: "CÔNG VIỆC" } }],
        });
      }
    }

    // 4. Truy vấn
    const logs = await prisma.auditLog.findMany({
      where: andConditions.length > 0 ? { AND: andConditions } : {},
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const activities = logs.map((log) => ({
      id: log.id,
      userName: log.userName || "Hệ thống",
      action: log.action,
      detail: log.detail,
      time: log.createdAt,
      type: log.type,
      table: log.table,
    }));

    return NextResponse.json(activities);
  } catch (error: any) {
    console.error("LỖI PRISMA:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { ThoiGianBieuRepoImpl } from "@/lib/api/repositories/TGB.repo.impl";
import { ThoiGianBieuService } from "@/domain/thoiGianBieu/TGB.service";

const service = new ThoiGianBieuService(new ThoiGianBieuRepoImpl());

export async function GET() {
  const data = await service.getAllByStudent(1);
  return NextResponse.json(data);
}
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const start = new Date(body.batDau);
    const end = new Date(body.ketThuc);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Ngày không hợp lệ");
    }

    const hocVienId = body.hocVienId; // 👈 truyền từ client

    const result = await prisma.thoiGianBieu.upsert({
      where: { hocVienId },
      update: {
        tieuDe: body.tieuDe,
        batDau: start,
        ketThuc: end,
        moTa: body.moTa,
      },
      create: {
        tieuDe: body.tieuDe,
        batDau: start,
        ketThuc: end,
        moTa: body.moTa,
        hocVienId,
      },
    });

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { ThoiGianBieuRepoImpl } from "@/lib/api/repositories/TGB.repo.impl";
import { ThoiGianBieuService } from "@/domain/thoiGianBieu/TGB.service";

const service = new ThoiGianBieuService(new ThoiGianBieuRepoImpl());

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const result = await service.updateSchedule(parseInt(params.id), body);
  return NextResponse.json(result);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await service.removeSchedule(parseInt(params.id));
  return NextResponse.json({ success: true });
}

import { prisma } from "@/lib/prisma";
import { IThoiGianBieuRepository } from "@/domain/thoiGianBieu/TGB.resposirory";

export class ThoiGianBieuRepoImpl implements IThoiGianBieuRepository {
  async findAll(hocVienId: number) {
    return await prisma.thoiGianBieu.findMany({ where: { hocVienId } });
  }

  async create(data: any) {
    return await prisma.thoiGianBieu.create({
      data: {
        tieuDe: data.tieuDe,
        batDau: new Date(data.batDau), // Ép kiểu Date chuyên nghiệp
        ketThuc: new Date(data.ketThuc),
        hocVienId: data.hocVienId,
      },
    });
  }

  async update(id: number, data: any) {
    return await prisma.thoiGianBieu.update({
      where: { id },
      data: {
        ...(data.batDau && { batDau: new Date(data.batDau) }),
        ...(data.ketThuc && { ketThuc: new Date(data.ketThuc) }),
        ...(data.tieuDe && { tieuDe: data.tieuDe }),
      },
    });
  }

  async delete(id: number) {
    await prisma.thoiGianBieu.delete({ where: { id } });
  }
}

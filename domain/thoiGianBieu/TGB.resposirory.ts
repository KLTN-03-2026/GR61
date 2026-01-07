import { ThoiGianBieu } from "@prisma/client";

// Repository Pattern: Định nghĩa một Interface (bản thiết kế)
// để ẩn đi chi tiết của Database phía sau.
export interface IThoiGianBieuRepository {
  findAll(hocVienId: number): Promise<ThoiGianBieu[]>;
  create(data: any): Promise<ThoiGianBieu>;
  update(id: number, data: any): Promise<ThoiGianBieu>;
  delete(id: number): Promise<void>;
}

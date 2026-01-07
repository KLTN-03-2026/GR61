import { IThoiGianBieuRepository } from "./TGB.resposirory";

// Service Pattern: Nơi chứa "Business Logic" - các quy tắc của hệ thống.
export class ThoiGianBieuService {
  // Dependency Injection: Service nhận vào một Repository qua constructor.
  // Nó không quan tâm Repo đó dùng MySQL hay MongoDB, chỉ cần đúng Interface.
  constructor(private repo: IThoiGianBieuRepository) {}

  async getAllByStudent(studentId: number) {
    return await this.repo.findAll(studentId);
  }

  async createNewSchedule(data: any) {
    // Logic: Kiểm tra thời gian logic
    if (new Date(data.batDau) >= new Date(data.ketThuc)) {
      throw new Error("Thời gian bắt đầu phải trước thời gian kết thúc");
    }
    return await this.repo.create(data);
  }

  async updateSchedule(id: number, data: any) {
    return await this.repo.update(id, data);
  }

  async removeSchedule(id: number) {
    return await this.repo.delete(id);
  }
}

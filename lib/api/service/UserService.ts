import { User } from "@prisma/client";
import { BaseService } from "../base/BaseService";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserDto, UpdateUserDto } from "../schemas/UserSchemas";

export class UserService extends BaseService<User> {
  constructor() {
    super(new UserRepository());
  }

  // Ghi đè với kiểu dữ liệu cụ thể (DTO)
  override create(data: CreateUserDto): Promise<User> {
    return super.create(data);
  }

  override update(id: number, data: UpdateUserDto): Promise<User> {
    return super.update(id, data);
  }
}

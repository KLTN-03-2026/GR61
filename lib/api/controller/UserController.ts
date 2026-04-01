import { BaseController } from "../base/BaseController";
import { UserService } from "../service/UserService";

import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/UserSchemas";

export class UserController extends BaseController<User> {
  constructor() {
    super(new UserService());
  }

  override create = async (req: NextRequest): Promise<NextResponse> => {
    try {
      const body = (await req.json()) as unknown;
      const validatedData = CreateUserSchema.parse(body);
      const result = await this.service.create(validatedData);
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : "Lỗi không xác định",
        },
        { status: 400 },
      );
    }
  };

  override update = async (
    id: number,
    req: NextRequest,
  ): Promise<NextResponse> => {
    try {
      const body = (await req.json()) as unknown;
      const validatedData = UpdateUserSchema.parse(body);
      const result = await this.service.update(id, validatedData);
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Cập nhật thất bại" },
        { status: 400 },
      );
    }
  };
}

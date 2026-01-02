import { NextRequest, NextResponse } from "next/server";
import { BaseService } from "./BaseService";

export class BaseController<TModel> {
  protected service: BaseService<TModel>;

  constructor(service: BaseService<TModel>) {
    this.service = service;
  }

  getAll = async (): Promise<NextResponse> => {
    const result = await this.service.getAll();
    return NextResponse.json(result);
  };

  getById = async (id: number): Promise<NextResponse> => {
    const result = await this.service.getById(id);
    return NextResponse.json(result);
  };

  create = async (req: NextRequest): Promise<NextResponse> => {
    const data = (await req.json()) as unknown;
    const result = await this.service.create(data);
    return NextResponse.json(result);
  };

  update = async (id: number, req: NextRequest): Promise<NextResponse> => {
    const data = (await req.json()) as unknown;
    const result = await this.service.update(id, data);
    return NextResponse.json(result);
  };

  delete = async (id: number): Promise<NextResponse> => {
    const result = await this.service.delete(id);
    return NextResponse.json(result);
  };
}

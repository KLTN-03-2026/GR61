// Định nghĩa interface Delegate mà không dùng 'any'
export interface PrismaDelegate<T> {
  findMany(args?: { include?: object; where?: object }): Promise<T[]>;
  findUnique(args: {
    where: Record<string, unknown>;
    include?: object;
  }): Promise<T | null>;
  create(args: { data: unknown }): Promise<T>;
  update(args: { where: Record<string, unknown>; data: unknown }): Promise<T>;
  delete(args: { where: Record<string, unknown> }): Promise<T>;
}

export class BaseRepository<TModel> {
  protected model: PrismaDelegate<TModel>;

  constructor(model: PrismaDelegate<TModel>) {
    this.model = model;
  }

  async findAll(include: object = {}): Promise<TModel[]> {
    return this.model.findMany({ include });
  }

  async findById(id: number, include: object = {}): Promise<TModel | null> {
    return this.model.findUnique({
      where: { id } as Record<string, unknown>,
      include,
    });
  }

  // Sử dụng unknown để bắt buộc phải kiểm tra kiểu dữ liệu ở lớp trên
  async create(data: unknown): Promise<TModel> {
    return this.model.create({ data });
  }

  async update(id: number, data: unknown): Promise<TModel> {
    return this.model.update({
      where: { id } as Record<string, unknown>,
      data,
    });
  }

  async delete(id: number): Promise<TModel> {
    return this.model.delete({
      where: { id } as Record<string, unknown>,
    });
  }
}

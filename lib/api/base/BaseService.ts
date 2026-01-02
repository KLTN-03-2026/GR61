import { BaseRepository } from "./BaseRepository";

export class BaseService<TModel> {
  protected repository: BaseRepository<TModel>;

  constructor(repository: BaseRepository<TModel>) {
    this.repository = repository;
  }

  getAll(includes: object = {}) {
    return this.repository.findAll(includes);
  }

  getById(id: number, include: object = {}) {
    return this.repository.findById(id, include);
  }

  create(data: unknown) {
    return this.repository.create(data);
  }

  update(id: number, data: unknown) {
    return this.repository.update(id, data);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}

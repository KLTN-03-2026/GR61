export interface ITodoRepository {
  findByDate(userId: number, date: Date): Promise<any[]>;
  create(data: any): Promise<any>;
  update(id: number, data: any): Promise<any>;
  delete(id: number): Promise<void>;
}

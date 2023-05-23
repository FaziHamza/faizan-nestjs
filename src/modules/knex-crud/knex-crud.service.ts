import { Inject, Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
@Injectable()
export class KnexCrudService {
  constructor(@InjectModel() private knex: Knex) {}

  async create(table: string, data: any): Promise<number> {
    const [id] = await this.knex(table).insert(data);
    return id;
  }

  async read(table: string): Promise<any> {
    const result = await this.knex(table).select();
    return result;
  }

  async readById(table: string, id: number): Promise<any> {
    const result = await this.knex(table).where('id', id).first();
    return result;
  }

  async update(table: string, id: number, data: any): Promise<void> {
    await this.knex(table).where('id', id).update(data);
  }

  async delete(table: string, id: number): Promise<void> {
    await this.knex(table).where('id', id).del();
  }

  async rollback(transaction: Knex.Transaction): Promise<void> {
    await transaction.rollback();
  }

  async transaction(): Promise<Knex.Transaction> {
    const transaction = await this.knex.transaction();
    return transaction;
  }
}

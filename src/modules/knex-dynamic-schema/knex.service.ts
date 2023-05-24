import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class KnexSchemaBuilderService {
  constructor(@InjectModel() private knex: Knex) {}

  async createOrUpdateTable(tableName: string, schema: any): Promise<void> {
    if (await this.knex.schema.hasTable(tableName)) {
      await this.updateTable(tableName, schema);
    } else {
      await this.createTable(tableName, schema);
    }
  }

  private async createTable(tableName: string, schema: any): Promise<void> {
    await this.knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();

      for (const key in schema) {
        const type = schema[key];
        this.addColumn(table, key, type);
      }
    });
  }

  private async updateTable(tableName: string, schema: any): Promise<void> {
    const existingColumns = await this.knex(tableName).columnInfo();

    await this.knex.schema.alterTable(tableName, (table) => {
      for (const key in schema) {
        const type = schema[key];
        if (!existingColumns[key]) {
          this.addColumn(table, key, type);
        }
      }

      for (const key in existingColumns) {
        if (!schema[key] && key !== 'id') {
          table.dropColumn(key);
        }
      }
    });
  }

  private addColumn(
    table: Knex.CreateTableBuilder,
    columnName: string,
    type: string,
  ) {
    switch (type) {
      case 'string':
        table.string(columnName);
        break;
      case 'number':
        table.integer(columnName);
        break;
      case 'boolean':
        table.boolean(columnName);
        break;
      case 'date':
        table.date(columnName);
        break;
      case 'dateTime':
        table.dateTime(columnName);
        break;
      // Add other types here
      default:
        throw new Error(`Unsupported type ${type} for column ${columnName}`);
    }
  }
}

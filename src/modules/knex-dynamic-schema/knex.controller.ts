import { Body, Controller, Post } from '@nestjs/common';
import { KnexSchemaBuilderService } from './knex.service';

@Controller('knex')
export class KnexController {
  constructor(private readonly knexService: KnexSchemaBuilderService) {}

  @Post()
  async createOrUpdateTable(@Body() body): Promise<string> {
    const { tableName, schema } = body;

    if (!tableName || !schema) {
      throw new Error('Both tableName and schema are required');
    }

    await this.knexService.createOrUpdateTable(tableName, schema);

    return `Table ${tableName} created or updated successfully`;
  }
}

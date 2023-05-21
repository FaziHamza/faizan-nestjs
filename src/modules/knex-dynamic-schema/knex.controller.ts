import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { KnexSchemaBuilderService } from './knex.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('knex')
export class KnexController {
  constructor(private readonly knexService: KnexSchemaBuilderService) {}

  @Post()
  async createOrUpdateTable(@Body() body): Promise<string> {
    const { tableName, schema } = body;

    if (!tableName || !schema) {
      throw new Error('Both table name and schema are required');
    }

    await this.knexService.createOrUpdateTable(tableName, schema);

    return `Table ${tableName} created or updated successfully`;
  }
}

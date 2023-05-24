import { Controller, Post, Body } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

@Controller('cron-post')
export class CronPostController {
  constructor(@InjectModel() private knex: Knex) {}

  @Post()
  async handlePostRequest(
    @Body() payload: { tableName: string; schema: Record<string, any> },
  ): Promise<void> {
    try {
      const { tableName, schema } = payload;
      await this.knex('CRON_JOB').insert({
        table_name: tableName,
        schema: JSON.stringify(schema),
      });
    } catch (error) {
      console.error(
        'An error occurred while handling the POST request:',
        error,
      );
    }
  }
}

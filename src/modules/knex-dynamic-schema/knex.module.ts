import { Module } from '@nestjs/common';
import { KnexController } from './knex.controller';
import { KnexSchemaBuilderService } from './knex.service';

@Module({
  imports: [],
  controllers: [KnexController],
  providers: [KnexSchemaBuilderService],
})
export class KnexSchemaModule {}

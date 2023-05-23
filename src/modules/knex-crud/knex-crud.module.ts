import { KnexCrudService } from './knex-crud.service';
import { KnexCrudController } from './knex-crud.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [KnexCrudController],
  providers: [KnexCrudService],
})
export class KnexCrudModule {}

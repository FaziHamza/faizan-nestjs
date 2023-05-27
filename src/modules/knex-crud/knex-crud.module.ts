import { KnexCrudService } from './knex-crud.service';
import { KnexCrudController } from './knex-crud.controller';

import { Module } from '@nestjs/common';
import { KnexEmployeeController } from '../knex-employee/knex-employee.controller';

@Module({
  imports: [],
  controllers: [KnexCrudController, KnexEmployeeController],
  providers: [KnexCrudService],
})
export class KnexCrudModule {}

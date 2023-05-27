import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KnexCrudService } from '../knex-crud/knex-crud.service';

@UseGuards(AuthGuard('jwt'))
@Controller('knex-employee')
export class KnexEmployeeController {
  constructor(private readonly knexCrudService: KnexCrudService) {}

  @Post()
  async createEmployee(@Body() data: any) {
    const trx = await this.knexCrudService.transaction();

    try {
      const departmentId = await trx('departments')
        .insert({ Name: data.department })
        .returning('id');

      const employee = {
        Name: data.name,
        Department_Id: departmentId[0].id,
      };

      await trx('employees').insert(employee);
      await trx.commit();
      console.log('Employee and department created successfully!');
    } catch (error) {
      await trx.rollback();
      console.log('Transaction failed. Rolling back changes.', error);
      throw new Error(error);
    }
  }
}

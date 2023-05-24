import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { KnexCrudService } from './knex-crud.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('knex-crud')
export class KnexCrudController {
  constructor(private readonly knexCrudService: KnexCrudService) {}

  @Post(':table')
  async create(
    @Param('table') table: string,
    @Body() data: any,
  ): Promise<number> {
    const transaction = await this.knexCrudService.transaction();
    try {
      const id = await this.knexCrudService.create(table, data);
      await transaction.commit();
      return id;
    } catch (error) {
      await this.knexCrudService.rollback(transaction);
      throw error;
    }
  }

  @Get(':table')
  async read(@Param('table') table: string): Promise<any> {
    return this.knexCrudService.read(table);
  }

  @Get(':table/:id')
  async readById(
    @Param('table') table: string,
    @Param('id') id: number,
  ): Promise<any> {
    return this.knexCrudService.readById(table, id);
  }

  @Put(':table/:id')
  async update(
    @Param('table') table: string,
    @Param('id') id: number,
    @Body() data: any,
  ): Promise<void> {
    const transaction = await this.knexCrudService.transaction();
    try {
      await this.knexCrudService.update(table, id, data);
      await transaction.commit();
    } catch (error) {
      await this.knexCrudService.rollback(transaction);
      throw error;
    }
  }

  @Delete(':table/:id')
  async delete(
    @Param('table') table: string,
    @Param('id') id: number,
  ): Promise<void> {
    const transaction = await this.knexCrudService.transaction();
    try {
      await this.knexCrudService.delete(table, id);
      await transaction.commit();
    } catch (error) {
      await this.knexCrudService.rollback(transaction);
      throw error;
    }
  }
}

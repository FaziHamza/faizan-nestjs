import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todos.service';
import { Todos } from './todos.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todos[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Todos> {
    return this.todoService.findById(id);
  }

  @Post()
  async create(@Body() user: Todos): Promise<Todos> {
    return this.todoService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: Todos): Promise<Todos> {
    return this.todoService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.todoService.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todos } from './todos.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todos)
    private todoRepository: Repository<typeof Todos>,
  ) {}

  async findAll(): Promise<(typeof Todos)[]> {
    return await this.todoRepository.find();
  }

  async findById(id: number): Promise<typeof Todos> {
    return await this.todoRepository.findOne({
      where: { id: id },
    });
  }

  async create(user: typeof Todos): Promise<typeof Todos> {
    return await this.todoRepository.save(user);
  }

  async update(id: number, user: typeof Todos): Promise<typeof Todos> {
    await this.todoRepository.update(id, user);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}

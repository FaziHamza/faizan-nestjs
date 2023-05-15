import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todos } from './todos.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todos)
    private todoRepository: Repository<Todos>,
  ) {}

  async findAll(): Promise<Todos[]> {
    return await this.todoRepository.find();
  }

  async findById(id: number): Promise<Todos> {
    return await this.todoRepository.findOne({
      where: { id: id },
    });
  }

  async create(user: Todos): Promise<Todos> {
    return await this.todoRepository.save(user);
  }

  async update(id: number, user: Todos): Promise<Todos> {
    await this.todoRepository.update(id, user);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}

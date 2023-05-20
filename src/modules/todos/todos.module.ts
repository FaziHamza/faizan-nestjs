/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { TodoService } from './todos.service';
import { Todos } from './todos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todos])],
  controllers: [TodosController],
  providers: [TodoService],
})
export class TodosModule {}

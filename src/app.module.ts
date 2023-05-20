import { KnexSchemaModule } from './modules/knex-dynamic-schema/knex.module';
import { StandardModule } from './modules/standard/standard.module';
import { StudentModule } from './modules/student/student.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './modules/todos/todos.entity';
import { TodosModule } from './modules/todos/todos.module';

@Module({
  imports: [
    KnexSchemaModule,
    TodosModule,
    StandardModule,
    StudentModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      database: 'FaizanMSSQL',
      entities: [Todos],
      username: 'faizan',
      password: 'abc123',
      synchronize: true,
      options: {
        encrypt: false,
      },
    }),

    MongooseModule.forRoot(
      'mongodb+srv://emadkhanqai:bLMB4D52Ihh8ukCV@cluster0.daixtco.mongodb.net/faizan-nestjs',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

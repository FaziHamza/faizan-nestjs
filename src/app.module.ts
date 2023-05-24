import { KnexCrudModule } from './modules/knex-crud/knex-crud.module';
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
import { KnexModule } from 'nest-knexjs';
import { DB_CONFIG } from './config/global-db-config';
import { KnexCronJob } from './config/cron-job';
import { KnexSchemaBuilderService } from './modules/knex-dynamic-schema/knex.service';

@Module({
  imports: [
    KnexSchemaModule,
    KnexCrudModule,
    TodosModule,
    StandardModule,
    StudentModule,
    AuthModule,
    KnexModule.forRoot({
      config: {
        client: DB_CONFIG.SQL.client,
        useNullAsDefault: true,
        connection: {
          host: DB_CONFIG.SQL.host,
          database: DB_CONFIG.SQL.database,
          user: DB_CONFIG.SQL.username,
          password: DB_CONFIG.SQL.password,
        },
      },
    }),

    TypeOrmModule.forRoot({
      type: 'mssql',
      host: DB_CONFIG.SQL.host,
      port: DB_CONFIG.SQL.sqlPort,
      database: DB_CONFIG.SQL.database,
      username: DB_CONFIG.SQL.username,
      password: DB_CONFIG.SQL.password,
      synchronize: true,
      entities: [Todos],
      options: {
        encrypt: false,
      },
    }),

    MongooseModule.forRoot(DB_CONFIG.MONGODB.mongoUrl),
  ],
  controllers: [AppController],
  providers: [AppService, KnexSchemaBuilderService, KnexCronJob],
})
export class AppModule {}

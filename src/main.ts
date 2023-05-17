import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Connection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const connection = app.get(Connection);

  // Just mention your table names here so that the data gets erased on runtime
  const tables = ['todos'];

  // Truncate or delete each table
  for (const tableName of tables) {
    await connection.query(`TRUNCATE TABLE ${tableName}`);
  }

  await app.listen(3000);
}
bootstrap();

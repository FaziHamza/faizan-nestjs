import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Connection } from 'typeorm';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const connection = app.get(Connection);
  app.enableCors({
    origin: ['http://localhost:4200','http://localhost:5600', ], // Replace with your Angular app's origin
    // You can add additional CORS configuration options here if needed
  });
  // Just mention your table names here so that the data gets erased on runtime
  // const tables = ['todos'];

  // // Truncate or delete each table
  // for (const tableName of tables) {
  //   await connection.query(`TRUNCATE TABLE ${tableName}`);
  // }
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('knex-crud')
  .addTag('knex')
  .addTag('knex-employee')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(4500);
}
bootstrap();

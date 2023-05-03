import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://emadkhanqai:bLMB4D52Ihh8ukCV@cluster0.daixtco.mongodb.net/faizan-nestjs',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

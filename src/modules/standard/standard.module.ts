/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StandardService } from './standard.service';
import { Standard, StandardSchema } from './standard.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Standard.name, schema: StandardSchema },
    ]),
  ],
  controllers: [],
  providers: [StandardService],
  exports: [StandardService],
})
export class StandardModule {}

import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Module } from '@nestjs/common';
import { Student, StudentSchema } from './student.model';
import { MongooseModule } from '@nestjs/mongoose';
import { StandardModule } from '../standard/standard.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    StandardModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}

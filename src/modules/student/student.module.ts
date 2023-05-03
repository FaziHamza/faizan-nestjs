import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Module } from '@nestjs/common';
import { Student, StudentSchema } from './student.model';
import { MongooseModule } from '@nestjs/mongoose';
import { StandardService } from '../standard/standard.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService, StandardService],
  exports: [StandardService],
})
export class StudentModule {}

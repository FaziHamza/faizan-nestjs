import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.model';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<Student[]> {
    return this.studentService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Student> {
    return this.studentService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: Student): Promise<Student> {
    return this.studentService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Student,
  ): Promise<Student> {
    return this.studentService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Student> {
    return this.studentService.delete(id);
  }
}

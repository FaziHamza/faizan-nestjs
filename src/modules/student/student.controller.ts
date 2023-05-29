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
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(JwtAuthGuard)
// @UseGuards(AuthGuard('jwt'))
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAll(): Promise<Student[]> {
    return this.studentService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Student> {
    return this.studentService.getById(id);
  }

  @Post()
  async create(@Body() body: Student): Promise<Student> {
    return this.studentService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Student,
  ): Promise<Student> {
    return this.studentService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Student> {
    return this.studentService.delete(id);
  }
}

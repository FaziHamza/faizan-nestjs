import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Student, StudentDocument } from './student.model';
import { StandardService } from '../standard/standard.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    private readonly standardService: StandardService,
  ) {}

  async getAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async getById(id: string): Promise<Student> {
    const student = await this.studentModel
      .findById(id)
      .populate('standard', 'name')
      .exec();
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async create(data: Student): Promise<Student> {
    console.log('standard', data);
    const objectId = new mongoose.Types.ObjectId(data.standard);
    console.log('objectId from create student 1', objectId);
    console.log('objectId from create student 2', objectId.toString());
    const standard = await this.standardService.getById(objectId.toString());
    if (!standard) {
      throw new NotFoundException('Standard not found');
    }
    const student = new this.studentModel(data);
    student.standard = objectId;
    await student.save();
    return student;
  }

  async update(id: string, data: Student): Promise<Student> {
    const objectId = new mongoose.Types.ObjectId(data.standard);
    const standard = await this.standardService.getById(objectId.toString());
    if (!standard) {
      throw new NotFoundException('Standard not found');
    }
    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    student.name = data.name;
    student.age = data.age;
    student.mobile = data.mobile;
    student.standard = objectId;
    await student.save();
    return student;
  }

  async delete(id: string): Promise<Student> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id);
    if (!deletedStudent) {
      throw new NotFoundException(`Student not found`);
    }
    return deletedStudent;
  }
}

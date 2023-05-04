import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Standard, StandardDocument } from './standard.model';

@Injectable()
export class StandardService {
  constructor(
    @InjectModel(Standard.name)
    private readonly standardModel: Model<StandardDocument>,
  ) {}

  async getAll(): Promise<Standard[]> {
    return this.standardModel.find().exec();
  }

  async getById(id: string): Promise<Standard> {
    const standard = await this.standardModel.findById(id).exec();
    if (!standard) {
      throw new NotFoundException('Standard not found here');
    }
    return standard;
  }

  async create(name: string, floor: number): Promise<Standard> {
    const standard = new this.standardModel({ name, floor });
    return standard.save();
  }

  async update(id: string, name: string, floor: number): Promise<Standard> {
    const standard = await this.standardModel.findById(id).exec();
    if (!standard) {
      throw new NotFoundException('Standard not found');
    }
    standard.name = name;
    standard.floor = floor;
    return standard.save();
  }

  async delete(id: string): Promise<Standard> {
    const standard = await this.standardModel.findById(id).exec();
    if (!standard) {
      throw new NotFoundException('Standard not found');
    }
    await this.standardModel.deleteOne({ _id: id }).exec();
    return standard;
  }
}

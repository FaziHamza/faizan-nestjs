import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  mobile: string;

  // @Prop({ type: 'ObjectId', ref: 'Standard' })
  // standard: Standard['_id'];

  @Prop({ type: String, ref: 'standard', required: true })
  standard: string;

  // @Prop({ required: true })
  // _id: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

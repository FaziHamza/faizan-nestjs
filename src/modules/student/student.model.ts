import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  mobile: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
  })
  standard: Types.ObjectId;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

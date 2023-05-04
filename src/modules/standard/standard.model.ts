import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StandardDocument = Standard & Document;

@Schema()
export class Standard {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  floor: number;
}

export const StandardSchema = SchemaFactory.createForClass(Standard);

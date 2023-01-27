import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { SkillSchema, Skill } from './subdocuments/skill.entity';

// customer schema for DB
@Schema()
export class Customer extends Document {
  // Schema properties
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  phone: string;

  // 1:N embedded
  @Prop({ type: [SkillSchema] })
  skills: Types.Array<Skill>;
}

// Customer schema creation
export const CustomerSchema = SchemaFactory.createForClass(Customer);

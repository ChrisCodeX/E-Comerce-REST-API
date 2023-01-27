import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// MongoDb Schema
@Schema()
export class User extends Document {
  // Schema properties
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  role: string;
}

// User schema creation
export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Skill {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  color: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

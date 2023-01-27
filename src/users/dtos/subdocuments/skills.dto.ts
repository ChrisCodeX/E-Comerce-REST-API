import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateSkillDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly color: string;
}

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}

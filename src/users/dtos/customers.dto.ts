import { Type } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';

import { CreateSkillDto } from './subdocuments/skills.dto';

@InputType()
export class CreateCustomerDto {
  @ApiProperty()
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  // 1:N Embedded
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  // Validate Dto
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  @IsArray()
  @ArrayNotEmpty()
  readonly skills: CreateSkillDto[];
}

@InputType()
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

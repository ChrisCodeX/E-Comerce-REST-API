import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

@InputType()
export class CreateBrandDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsUrl()
  image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

import {
  IsString,
  IsNumber,
  IsPositive,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  Min,
  ValidateIf,
  // Validation document embedded
  ValidateNested,
  // Validation document referenced
  IsMongoId,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateCategoryDto } from './subdocuments/categories.dto';
import { Types } from 'mongoose';

@InputType()
export class CreateProductDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @Field()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  // 1-1 embedded
  @Field()
  @ValidateNested()
  @IsNotEmpty()
  readonly category: CreateCategoryDto;

  // 1-1 referenced
  @ApiProperty()
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  readonly brand: Types.ObjectId;
}

@InputType()
export class UpdateProductDto extends PartialType(CreateProductDto) {}

@InputType()
export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}

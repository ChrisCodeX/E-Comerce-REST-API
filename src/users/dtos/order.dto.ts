import { Field, InputType } from '@nestjs/graphql';
import { PartialType, OmitType } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class CreateOrderDto {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  readonly customer: Types.ObjectId;

  @Field()
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @Field()
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  readonly products: Types.ObjectId[];
}

// Omit products for update
@InputType()
export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['customer']),
) {}

@InputType()
export class AddProductsToOrderDto {
  @Field()
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  readonly products: Types.ObjectId[];
}

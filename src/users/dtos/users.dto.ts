import { Field, InputType } from '@nestjs/graphql';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @ApiProperty({ description: 'user email' })
  @Field()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly role: string;
}

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {}

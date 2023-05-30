import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  middleName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  age: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  gender: string;

  @ApiProperty({ required: true })
  @IsNumberString()
  @Length(9, 20)
  mobile: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address: string;
}

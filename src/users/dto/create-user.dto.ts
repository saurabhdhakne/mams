import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator';
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

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  middleName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumberString()
  @Length(9, 20)
  mobile: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  address: string;
}

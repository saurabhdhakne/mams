import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { Put } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<User[] | undefined> {
    try {
      return this.usersService.findUsers();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User | undefined> {
    try {
      return this.usersService.findUserById(+id);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | undefined> {
    try {
      const user = await this.usersService.findUserByEmail(createUserDto.email);
      if (user) {
        throw new BadRequestException(
          `User with email ${createUserDto.email} is already exist.`,
        );
      }

      return this.usersService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(+id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.findUserById(id);
      if (!user) {
        throw new BadRequestException(
          `User with given id ${id} does not exist.`,
        );
      }

      return this.usersService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}

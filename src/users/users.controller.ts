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
import { LoggerService } from '../common/logger.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly logger: LoggerService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAllUsers(): Promise<User[] | undefined> {
    try {
      return this.usersService.findUsers();
    } catch (error) {
      this.logger.log(error, 'FindAllUsersController');
      throw error;
    }
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User | undefined> {
    try {
      return this.usersService.findUserById(id);
    } catch (error) {
      this.logger.log(error, 'FindUserByIdController');
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
        this.logger.log(
          `User with email ${createUserDto.email} is already exist.`,
          'CreateUserController',
        );
        throw new BadRequestException(
          `User with email ${createUserDto.email} is already exist.`,
        );
      }

      return this.usersService.create(createUserDto);
    } catch (error) {
      this.logger.log(error, 'CreateUserController');
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      this.logger.log(error, 'UpdateUserController');
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.findUserById(id);
      if (!user) {
        this.logger.log(
          `User with given id ${id} does not exist.`,
          'RemoveUserController',
        );
        throw new BadRequestException(
          `User with given id ${id} does not exist.`,
        );
      }

      return this.usersService.remove(id);
    } catch (error) {
      this.logger.log(error, 'RemoveUserController');
      throw error;
    }
  }
}

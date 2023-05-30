import { Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { LoggerService } from '../common/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    try {
      const user = new User();
      Object.assign(user, createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.log(error, 'CreateUserService');
      throw new InternalServerErrorException(error);
    }
  }

  async findUsers(): Promise<User[] | undefined> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.log(error, 'FindUsersService');
      throw new InternalServerErrorException(error);
    }
  }

  async findUserById(id: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.log(error, 'FindUserByIdService');
      throw new InternalServerErrorException(error);
    }
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      this.logger.log(error, 'FindUserByEmailService');
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    try {
      if (!id) {
        throw new NotFoundException('Id is missing');
      }
      const user = new User();
      Object.assign(user, { id, ...updateUserDto });
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.log(error, 'UpdateUserService');
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      this.logger.log(error, 'RemoveUserService');
      throw new InternalServerErrorException(error);
    }
  }
}

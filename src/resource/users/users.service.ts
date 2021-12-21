import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
  ) {}

  createUser = async (createUserDto: CreateUserDto): Promise<User> => {
    const user = await this.usersRepository.createUser(createUserDto);
    return user;
  };

  getAll = async (): Promise<User[]> => this.usersRepository.getAllUsers();

  getById = async (id: string): Promise<User | null> => {
    const user = await this.usersRepository.getById(id);
    if (!user) return null;
    return user;
  };

  findByCredentials = async (login: string, password: string): Promise<User | null> => {
    const user = await this.usersRepository.findByCredentials(login);
    if (!user) return null;
    const passwordVerification = await bcrypt.compare(password, user.password);
    if (!passwordVerification) return null;
    return user;
  };

  deleteById = async (id: string): Promise<User | null> => {
    const userDeletable = await this.usersRepository.getById(id);
    if (!userDeletable) return null;
    await this.usersRepository.deleteById(id);

    return userDeletable;
  };

  updateById = async (id: string, updateUserDto: UpdateUserDto): Promise<User | null> => {
    await this.usersRepository.updateById(id, updateUserDto);
    const user = await this.usersRepository.getById(id);
    if (!user) return null;
    return user;
  };
}
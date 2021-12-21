import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../environments';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  gettingToken = async (userLogin: string, userPassword: string): Promise<string | null> => {
    const user = await this.userService.findByCredentials(userLogin, userPassword);
    if (!user) {
      return null;
    }
    const { id, login } = user;
    const token = jwt.sign({ id, login }, <jwt.Secret>JWT_SECRET_KEY, {
      expiresIn: '2h',
    });
    return token;
  };
}
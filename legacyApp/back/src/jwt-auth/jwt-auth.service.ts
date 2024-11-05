import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { ReqUser } from 'src/types';

import { UsersService } from '../user/user.service';

import { JwtResult } from './types';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(login: string, password: string): Promise<ReqUser | null> {
    const user = await this.usersService.findBy('login', login);
    // TODO later include bcrypt or argon2 to hash password
    if (user && user.password === password) {
      const { password, createdAt, updatedAt, ...result } = user;

      return result as ReqUser;
    }

    return null;
  }

  login(user: ReqUser): JwtResult {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}

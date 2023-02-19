import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UsersService } from '../user/user.service';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findBy('login', login);
    // TODO later include bcrypt or argon2 to hash password
    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}

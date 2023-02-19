import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/user/user.service';

@Injectable()
export class SessionAuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findBy('login', login);

    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ReqUser } from 'src/types';

import { JwtAuthService } from './jwt-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtAuthService: JwtAuthService) {
    super({ usernameField: 'login' });
  }

  async validate(login: string, password: string): Promise<ReqUser> {
    const user = await this.jwtAuthService.validateUser(login, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

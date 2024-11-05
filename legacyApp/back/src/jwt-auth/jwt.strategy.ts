import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ReqUser } from 'src/types';

import { JwtUser } from './types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'cat',
    });
  }

  // TODO learn jwt nest documentation maybe we can hide iat and exp fields
  async validate({ iat, exp, ...user }: JwtUser): Promise<ReqUser> {
    return { ...user };
  }
}

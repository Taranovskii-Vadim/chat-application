import { Controller, Post, UseGuards } from '@nestjs/common';

import { ReqUser } from 'src/types';
import { User } from 'src/decorators';

import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthService } from './jwt-auth.service';

import { JwtResult } from './types';

@Controller('auth')
export class JwtAuthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signIn')
  login(@User() data: ReqUser): JwtResult {
    return this.jwtAuthService.login(data);
  }
}

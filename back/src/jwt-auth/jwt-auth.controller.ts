import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { Req } from 'src/types';

import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthService } from './jwt-auth.service';

import { JwtResult } from './types';

@Controller('auth')
export class JwtAuthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signIn')
  login(@Request() req: Req): JwtResult {
    return this.jwtAuthService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: Req): Req['user'] {
    return req.user;
  }
}

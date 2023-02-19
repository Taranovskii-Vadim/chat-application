import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthService } from './jwt-auth.service';

@Controller('auth')
export class JwtAuthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signIn')
  login(@Request() req: any): any {
    return this.jwtAuthService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}

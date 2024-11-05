import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SessionGuard } from './session.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { SessionAuthService } from './session-auth.service';

@Controller('auth')
export class SessionAuthController {
  constructor(private sessionAuthService: SessionAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signIn')
  login(@Request() req: any): any {
    return req.user;
  }

  @UseGuards(SessionGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}

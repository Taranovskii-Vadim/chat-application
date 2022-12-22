import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { LocalAuthGuard } from './local-auth.guard';

@Controller('/api/auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async login(@Req() req: Request) {
    return req.user;
  }
}

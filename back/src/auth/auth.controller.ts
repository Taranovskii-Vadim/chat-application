import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('/api/auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('signIn')
  async login(@Req() req: Request) {
    return req.user;
  }
}

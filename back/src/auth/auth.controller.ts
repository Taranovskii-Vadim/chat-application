import { Body, Controller, Post } from '@nestjs/common';

import { SignUpDTO } from './types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signUp(@Body() body: SignUpDTO) {
    return this.authService.signUp(body);
  }
}

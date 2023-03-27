import { Controller, UseGuards, Get } from '@nestjs/common';

import { ReqUser } from 'src/types';
import { User } from 'src/decorators';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Get('profile')
  getProfile(@User() data: ReqUser): ReqUser {
    return data;
  }
}

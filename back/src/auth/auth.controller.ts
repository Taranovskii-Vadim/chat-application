import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import { Body, Controller, Post } from '@nestjs/common';
import { Req, Res } from '@nestjs/common/decorators';

import { SignUpDTO, User } from './types';

const maxAge = 300000;

@Controller('/api/auth')
export class AuthController {
  private readonly users: User[] = [
    { id: 1, login: 'admin', password: 'admin' },
  ];

  // @Post('/signUp')
  // signUp(@Body() body: SignUpDTO) {
  //   return this.authService.signUp(body);
  // }

  @Post('/signIn')
  signIn(@Body() { login }: SignUpDTO, @Res() res: Response) {
    const result = this.users.find((item) => item.login === login);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    // TODO move env var to env file
    // TODO sign not whole result object
    const token = jwt.sign(result, 'TOKEN');

    return res.cookie('token', token, { maxAge }).json();
  }
}

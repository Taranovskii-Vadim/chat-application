import { Injectable } from '@nestjs/common';

import { SignUpDTO, User } from './types';

@Injectable()
export class AuthService {
  private readonly users: User[] = [];

  signUp(payload: SignUpDTO): number {
    const id = this.users.length + 1;

    this.users.push({ id, ...payload });

    return id;
  }
}

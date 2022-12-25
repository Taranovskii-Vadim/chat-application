import { Injectable } from '@nestjs/common';

import { User } from './types';

@Injectable()
export class UsersService {
  public readonly users: User[] = [
    {
      id: 1,
      login: 'admin',
      name: 'vadim',
      lastname: 'taranovsckiy',
      password: 'admin',
    },
    {
      id: 2,
      login: 'devil',
      name: 'eva',
      lastname: 'summer',
      password: 'qwerty',
    },
    {
      id: 3,
      login: 'teste',
      name: 'ella',
      lastname: 'winter',
      password: 'qwerty',
    },
  ];

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  // TODO use async because in future we can access to DB here
  async findByLogin(login: string): Promise<User | undefined> {
    return this.users.find((user) => user.login === login);
  }
}

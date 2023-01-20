import { Injectable } from '@nestjs/common';

import { User } from './types';

@Injectable()
export class UsersService {
  public readonly users: User[] = [
    {
      id: 1,
      login: 'admin',
      name: 'вадим',
      lastname: 'тарановский',
      password: 'admin',
    },
    {
      id: 2,
      login: 'devil',
      name: 'ева',
      lastname: 'саммер',
      password: 'qwerty',
    },
    {
      id: 3,
      login: 'teste',
      name: 'круэлла',
      lastname: 'винтер',
      password: 'qwerty',
    },
  ];

  findById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getFullname(id: number): string | undefined {
    const user = this.findById(id) as User;

    return `${user.name} ${user.lastname}`;
  }

  // TODO use async because in future we can access to DB here
  async findByLogin(login: string): Promise<User | undefined> {
    return this.users.find((user) => user.login === login);
  }
}

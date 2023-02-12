import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly table: Repository<User>,
  ) {}

  // public readonly users: User[] = [
  //   {
  //     id: 1,
  //     login: 'admin',
  //     name: 'вадим',
  //     lastname: 'тарановский',
  //     password: 'admin',
  //   },
  //   {
  //     id: 2,
  //     login: 'devil',
  //     name: 'ева',
  //     lastname: 'саммер',
  //     password: 'qwerty',
  //   },
  //   {
  //     id: 3,
  //     login: 'teste',
  //     name: 'круэлла',
  //     lastname: 'винтер',
  //     password: 'qwerty',
  //   },
  // ];

  async findById(id: number): Promise<User | null> {
    const result = await this.table.findOne({ where: { id } });

    return result;
  }

  // getFullname(id: number): string | undefined {
  //   const user = this.findById(id) as User;

  //   return `${user.name} ${user.lastname}`;
  // }

  async findByLogin(login: string): Promise<User | null> {
    const result = await this.table.findOne({ where: { login } });

    return result;
  }
}

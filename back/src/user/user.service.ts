import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly table: Repository<User>,
  ) {}

  async findBy<T>(key: 'id' | 'login', value: T): Promise<User | null> {
    const result = await this.table.findOne({ where: { [key]: value } });

    return result;
  }

  async getFullname(id: number): Promise<string> {
    const user = await this.findBy('id', id);

    if (user) {
      const name = user.name[0].toUpperCase() + user.name.slice(1);
      const lastname = user.lastname[0].toUpperCase() + user.lastname.slice(1);

      return `${name} ${lastname}`;
    }

    return '';
  }
}

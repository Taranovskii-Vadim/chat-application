import { Column, Entity } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { Base } from 'src/utils';

@Entity()
export class User extends Base {
  @Column({ unique: true })
  login: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Exclude()
  @Column()
  password: string;

  // TODO can set fullname here. But front has name and lastname why we need it???
  // @Expose()
  // get fullName(): string {
  //   return `${this.lastname} ${this.name}`;
  // }
}

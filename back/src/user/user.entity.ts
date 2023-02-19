import { Column, Entity } from 'typeorm';

import { Base } from 'src/utils';

@Entity()
export class User extends Base {
  @Column({ unique: true })
  login: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  // TODO we can set select false to exclude password but we need password for user validation in auth method
  // { select: false }
  @Column()
  password: string;
}

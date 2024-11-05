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
}

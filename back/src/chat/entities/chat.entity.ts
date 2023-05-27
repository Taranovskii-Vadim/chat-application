import { Column, Entity } from 'typeorm';

import { Base } from 'src/utils';

@Entity()
export class Chat extends Base {
  @Column('int', { array: true })
  members: number[];
}

import { Column, Entity } from 'typeorm';

import { Base } from 'src/utils';

@Entity()
export class Chat extends Base<number> {
  @Column('int', { array: true })
  members: number[];

  @Column({ name: 'unread_count' })
  unReadCount: number;

  @Column({ name: 'last_message_id' })
  lastMessageId: string;
}

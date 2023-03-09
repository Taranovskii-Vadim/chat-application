import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { Base } from 'src/utils';
import { Message } from 'src/message/message.entity';

@Entity()
export class Chat extends Base {
  @Column('int', { array: true })
  members: number[];

  @JoinColumn({ name: 'pinned_message_id_fkey' })
  @OneToOne(() => Message, { nullable: true })
  pinnedMessage: Message;

  @JoinColumn({ name: 'last_message_id_fkey' })
  @OneToOne(() => Message, { nullable: true })
  lastMessage: Message;
}

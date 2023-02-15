import { Column, Entity } from 'typeorm';

import { Base } from 'src/utils';

@Entity()
export class Message extends Base {
  @Column({ name: 'chat_id_fkey' })
  chatId: number;

  @Column({ name: 'sender_id_fkey' })
  senderId: number;

  @Column()
  text: string;

  @Column({ name: 'replied_id_fkey', nullable: true })
  repliedId: string;
}

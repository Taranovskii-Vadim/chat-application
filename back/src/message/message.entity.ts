import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Base } from 'src/utils';
import { Chat } from 'src/chat/chat.entity';
import { User } from 'src/user/user.entity';

// TODO get better understanding how to use relations

@Entity()
export class Message extends Base {
  @JoinColumn({ name: 'chat_id_fkey' })
  @ManyToOne(() => Chat)
  chat: Chat;

  @JoinColumn({ name: 'user_id_fkey' })
  @ManyToOne(() => User)
  sender: User;

  @Column()
  text: string;

  @Column({ type: 'boolean', name: 'edited', default: false })
  isEdited: boolean;

  @JoinColumn({ name: 'replied_id_fkey' })
  @ManyToOne(() => Message, { nullable: true })
  replied: Message;
}

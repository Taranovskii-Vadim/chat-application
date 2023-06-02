import { readFileSync } from 'fs';
import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from 'src/utils';
import { Chat } from 'src/chat/entities/chat.entity';
import { User } from 'src/user/entities/user.entity';

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

  @Column({ default: false })
  isEdited: boolean;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ default: 'unread' })
  status: string;

  @Column({ name: 'file_path', nullable: true })
  filePath: string;

  @Expose()
  get file(): string | null {
    if (this.filePath) {
      return (
        'data:image/jpeg;base64,' +
        readFileSync(this.filePath).toString('base64')
      );
    }

    return null;
  }

  @JoinColumn({ name: 'replied_id_fkey' })
  @ManyToOne(() => Message, { nullable: true })
  replied: Message;
}

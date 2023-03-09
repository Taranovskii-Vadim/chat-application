import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from 'src/utils';
import { Chat } from 'src/chat/chat.entity';
import { User } from 'src/user/user.entity';

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
  isHidden: boolean;

  @Column({ default: 'unread' })
  status: string;

  @JoinColumn({ name: 'replied_id_fkey' })
  @ManyToOne(() => Message, { nullable: true })
  replied: Message;
}

// import { Entity, PrimaryColumn, Column, BeforeInsert, BaseEntity } from 'typeorm';

// import * as bcrypt from 'bcryptjs';

// @Entity('users')
// export class User extends BaseEntity {
// 	@PrimaryColumn('uuid') id: string;

// 	@Column('varchar', { length: 255 })
// 	firstName: string;

// 	@Column('varchar', { length: 255 })
// 	lastName: string;

// 	@Column('text') email: string;

// 	@Column('text') password: string;

// 	@Column('boolean', { default: false })
// 	confirmed: boolean;

// 	@BeforeInsert()
// 	addId() {
// 		this.id = v4();
// 	}
// 	async hashPassword() {
// 		this.password = await bcrypt.hash(this.password, 10);
// 	}
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// import { User } from 'src/users/types';
// import { ChatsService } from 'src/chats/chats.service';
// import { UsersService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

import { MessageDTO } from './types';

@Injectable()
export class MessagesService {
  // constructor(private chatsService: ChatsService) {}
  constructor(
    // private usersService: UsersService,
    @InjectRepository(Message) private readonly table: Repository<Message>,
  ) {}

  private getSenderFullname(id: number): string {
    // return this.usersService.getFullname(id) as string;
    return '';
  }

  // private prepareMessageDTO(message: Message): MessageDTO {
  //   const { repliedId, senderId, ...r } = message;

  //   const fullname = this.getSenderFullname(senderId);

  //   const sender: MessageDTO['sender'] = { id: senderId, fullname };

  //   const res = this.messages.find(({ id }) => id === repliedId);

  //   const replied: MessageDTO['replied'] = res && {
  //     id: res.id,
  //     text: res.text,
  //     fullname: this.getSenderFullname(res.senderId),
  //   };

  //   return { ...r, sender, replied };
  // }

  async getMessages(chatId: number): Promise<any> {
    const result = await this.table.find({ where: { chatId } });
    // const messages = this.messages.filter(({ chatId }) => chatId === id);
    // return messages.map((item) => this.prepareMessageDTO(item));
  }

  getMessage(id?: string): any {
    // const result = this.messages.find((item) => item.id === id);
    // return result && this.prepareMessageDTO(result);
  }

  // createMessage(payload: Message): void {
  //   this.messages.push(payload);

  //   // TODO after create we must call this action to update id, but here we probadly have circular dep error in nest
  //   // this.chatsService.setChatLastMessageId(payload.chatId, payload.id);
  // }

  // updateMessage(data: Partial<Message>): void {
  //   const index = this.messages.findIndex(({ id }) => id === data.id);

  //   this.messages[index] = { ...this.messages[index], ...data, isEdited: true };
  // }
}

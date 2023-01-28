import { Injectable } from '@nestjs/common';

// import { User } from 'src/users/types';
// import { ChatsService } from 'src/chats/chats.service';
import { UsersService } from 'src/users/users.service';

import { Message, MessageDTO } from './types';

@Injectable()
export class MessagesService {
  private messages: Message[] = [
    {
      id: '1',
      chatId: 1,
      senderId: 1,
      text: 'hello user 2',
      createdAt: new Date(),
    },
    {
      id: '2',
      chatId: 1,
      senderId: 2,
      text: 'hello user 1',
      createdAt: new Date(),
    },
    {
      id: '3',
      chatId: 1,
      senderId: 2,
      text: 'how are you?',
      createdAt: new Date(),
    },
    {
      id: '4',
      chatId: 1,
      senderId: 1,
      repliedId: '3',
      text: 'good what about you? and btw how is your leg, i heard you hurt it last basketball game',
      createdAt: new Date(),
    },
  ];

  // constructor(private chatsService: ChatsService) {}
  constructor(private usersService: UsersService) {}

  private getSenderFullname(id: number): string {
    return this.usersService.getFullname(id) as string;
  }

  private prepareMessageDTO(message: Message): MessageDTO {
    const { repliedId, senderId, ...r } = message;

    const fullname = this.getSenderFullname(senderId);

    const sender: MessageDTO['sender'] = { id: senderId, fullname };

    const res = this.messages.find(({ id }) => id === repliedId);

    const replied: MessageDTO['replied'] = res && {
      id: res.id,
      text: res.text,
      fullname: this.getSenderFullname(res.senderId),
    };

    return { ...r, sender, replied };
  }

  getMessages(id: number): MessageDTO[] {
    const messages = this.messages.filter(({ chatId }) => chatId === id);

    return messages.map((item) => this.prepareMessageDTO(item));
  }

  getMessage(id?: string): MessageDTO | undefined {
    const result = this.messages.find((item) => item.id === id);

    return result && this.prepareMessageDTO(result);
  }

  createMessage(payload: Message): void {
    this.messages.push(payload);

    // TODO after create we must call this action to update id, but here we probadly have circular dep error in nest
    // this.chatsService.setChatLastMessageId(payload.chatId, payload.id);
  }

  updateMessage(payload: Message): void {
    const index = this.messages.findIndex(({ id }) => id === payload.id);

    this.messages[index] = { ...payload, isEdited: true };
  }
}

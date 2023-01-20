import { Injectable } from '@nestjs/common';

import { User } from 'src/users/types';
// import { ChatsService } from 'src/chats/chats.service';
import { UsersService } from 'src/users/users.service';

import { LastMessage, Message, MessageRender } from './types';

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
      replied: {
        id: '3',
        fullname: 'Вадим Тарановский',
      },
      text: 'good what about you? and btw how is your leg, i heard you hurt it last basketball game',
      createdAt: new Date(),
    },
  ];

  // constructor(private chatsService: ChatsService) {}
  constructor(private usersService: UsersService) {}

  getMessages(id: number): MessageRender[] {
    const messages = this.messages.filter(({ chatId }) => chatId === id);

    const result = messages.map(({ senderId, replied, ...others }) => {
      const fullname = this.usersService.getFullname(senderId) as string;

      const res = replied && this.messages.find(({ id }) => id === replied.id);
      const rep = res && { text: res.text, ...replied };

      return { ...others, sender: { id: senderId, fullname }, replied: rep };
    });

    return result;
  }

  getMessage(id?: string): LastMessage | undefined {
    const result = this.messages.find((item) => item.id === id);

    return (
      result && {
        text: result.text,
        senderId: result.senderId,
        createdAt: result.createdAt,
      }
    );
  }

  // TODO also put fullname to reply object
  createMessage(payload: Message): void {
    this.messages.push(payload);
    // TODO also return sender object here
    // const sender = this.usersService.getFullname(senderId) as string;

    // TODO after create we must call this action to update id, but here we probadly have circular dep error in nest
    // this.chatsService.setChatLastMessageId(payload.chatId, payload.id);
  }
}

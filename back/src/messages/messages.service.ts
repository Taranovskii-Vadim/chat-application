import { Injectable } from '@nestjs/common';

import { ChatsService } from 'src/chats/chats.service';

import { LastMessage, Message } from './types';

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
      text: 'good what about you? and btw how is your leg, i heard you hurt it last basketball game',
      createdAt: new Date(),
    },
  ];

  // constructor(private chatsService: ChatsService) {}

  getMessages(id: number): Message[] {
    const result = this.messages.filter(({ chatId }) => chatId === id);

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

  createMessage(payload: Message): void {
    this.messages.push(payload);
    // TODO after create we must call this action to update id, but here we probadly have circular dep error in nest
    // this.chatsService.setChatLastMessageId(payload.chatId, payload.id);
  }
}

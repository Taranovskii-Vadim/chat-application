import { Injectable } from '@nestjs/common';
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
  }
}

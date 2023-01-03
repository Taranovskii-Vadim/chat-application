import { Injectable } from '@nestjs/common';
import { LastMessage, Message, NewMessageDTO } from './types';

@Injectable()
export class MessagesService {
  private messages: Message[] = [
    {
      id: 1,
      chatId: 1,
      senderId: 1,
      text: 'hello user 2',
      createdAt: new Date(),
    },
    {
      id: 2,
      chatId: 1,
      senderId: 2,
      text: 'hello user 1',
      createdAt: new Date(),
    },
    {
      id: 3,
      chatId: 1,
      senderId: 1,
      text: 'how are you?',
      createdAt: new Date(),
    },
    {
      id: 4,
      chatId: 1,
      senderId: 2,
      text: 'good what about you?',
      createdAt: new Date(),
    },
    { id: 5, chatId: 2, senderId: 1, text: 'first?', createdAt: new Date() },
    { id: 6, chatId: 2, senderId: 3, text: 'second?', createdAt: new Date() },
  ];

  getMessages(id: number): Message[] {
    const result = this.messages.filter(({ chatId }) => chatId === id);

    return result;
  }

  getMessage(id?: number): LastMessage | undefined {
    const result = this.messages.find((item) => item.id === id);

    return result && { text: result.text, createdAt: result.createdAt };
  }

  createMessage(payload: NewMessageDTO): number {
    const id = this.messages.length + 1;

    this.messages.push({ id, ...payload });

    return id;
  }
}

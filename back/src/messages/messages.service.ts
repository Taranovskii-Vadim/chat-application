import { Injectable } from '@nestjs/common';
import { Message, NewMessageDTO } from './types';

@Injectable()
export class MessagesService {
  private messages: Message[] = [
    { id: 1, chatId: 1, senderId: 1, text: 'hello user 1' },
    { id: 2, chatId: 1, senderId: 2, text: 'hello user 2' },
  ];

  getMessages(id: number): Message[] {
    const result = this.messages.filter(({ chatId }) => chatId === id);

    return result;
  }

  createMessage(payload: NewMessageDTO): number {
    const id = this.messages.length + 1;

    this.messages.push({ id, ...payload });

    return id;
  }
}

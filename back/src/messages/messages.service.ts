import { Injectable } from '@nestjs/common';
import { Message, NewMessageDTO } from './types';

@Injectable()
export class MessagesService {
  private messages: Message[] = [];

  createMessage(payload: NewMessageDTO): number {
    const id = this.messages.length + 1;

    this.messages.push({ id, ...payload });

    return id;
  }
}

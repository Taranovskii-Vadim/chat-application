import { Injectable } from '@nestjs/common';

import { Chat, NewChatDTO } from './types';

@Injectable()
export class ChatsService {
  private chats: Chat[] = [{ id: 1, members: [1, 2] }];

  getChats(userId: number): Chat[] {
    const result = this.chats.filter(({ members }) => members.includes(userId));

    return result;
  }

  getChat(chatId: number): Chat | undefined {
    return this.chats.find(({ id }) => id === chatId);
  }

  createChat({ senderId, receiverId }: NewChatDTO): number {
    const id = this.chats.length + 1;

    this.chats.push({ id, members: [senderId, receiverId] });

    return id;
  }
}

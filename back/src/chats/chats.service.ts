import { Injectable } from '@nestjs/common';

import { User } from 'src/users/types';
import { UsersService } from 'src/users/users.service';

import { capitalizeString } from './helpers';
import { Chat, ChatDB, ChatWithTitle, NewChatDTO } from './types';

@Injectable()
export class ChatsService {
  private chats: ChatDB[] = [
    { id: 1, members: [1, 2], unReadCount: 0 },
    { id: 2, members: [1, 3], unReadCount: 14 },
    { id: 3, members: [2, 3], unReadCount: 6 },
  ];

  constructor(private usersService: UsersService) {}

  private getChatTitle(membersId: number[]): string {
    const result = membersId.map((id) => {
      const user = this.usersService.findById(id) as User;

      const name = capitalizeString(user.name);
      const lastname = capitalizeString(user.lastname);

      return `${name} ${lastname}`;
    });

    return result.join(', ');
  }

  getChats(userId: number): ChatWithTitle[] {
    const filtered = this.chats.filter(({ members }) =>
      members.includes(userId),
    );

    const result = filtered.map(({ members, ...other }) => {
      const otherMembers = members.filter((id) => id !== userId);

      const title = this.getChatTitle(otherMembers);

      return { title, ...other };
    });

    return result;
  }

  getChat(userId: number, chatId: number): Chat | undefined {
    const result = this.chats.find(({ id }) => id === chatId);

    if (!result) return undefined;

    const filtered = result.members.filter((id) => id !== userId);
    const title = this.getChatTitle(filtered);

    return {
      title,
      id: result.id,
      members: filtered,
      unReadCount: result.unReadCount,
    };
  }

  createChat({ senderId, receiverId }: NewChatDTO): number {
    const id = this.chats.length + 1;

    // TODO put here not id but full short user info
    // this.chats.push({ id, members: [senderId, receiverId] });

    return id;
  }
}

import { Injectable } from '@nestjs/common';

import { User } from 'src/users/types';
import { UsersService } from 'src/users/users.service';

import { capitalizeString } from './helpers';
import { Chat, ExpandedChat, NewChatDTO } from './types';

@Injectable()
export class ChatsService {
  private chats: Chat[] = [
    { id: 1, members: [1, 2], unReadCount: 0 },
    { id: 2, members: [1, 3], unReadCount: 14 },
    { id: 3, members: [2, 3], unReadCount: 6 },
  ];

  constructor(private usersService: UsersService) {}

  // TODO create chat title method

  getChats(userId: number): ExpandedChat[] {
    const filtered = this.chats.filter(({ members }) =>
      members.includes(userId),
    );

    const result = filtered.map(({ members, ...other }) => {
      const otherMembers = members.filter((id) => id !== userId);

      const title = otherMembers
        .map((id) => {
          const user = this.usersService.findById(id) as User;

          const name = capitalizeString(user.name);
          const lastname = capitalizeString(user.lastname);

          return `${name} ${lastname}`;
        })
        .join(', ');

      return { title, ...other };
    });

    return result;
  }

  getChat(chatId: number): Chat | undefined {
    return this.chats.find(({ id }) => id === chatId);
  }

  createChat({ senderId, receiverId }: NewChatDTO): number {
    const id = this.chats.length + 1;

    // TODO put here not id but full short user info
    // this.chats.push({ id, members: [senderId, receiverId] });

    return id;
  }
}

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ReqUser } from 'src/types';
import { UsersService } from 'src/user/user.service';

import { Chat } from './chat.entity';
import { GetChatDTO } from './chat.dto';

// TODO maybe later develop group chats

@Injectable()
export class ChatsService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Chat) private readonly table: Repository<Chat>,
  ) {}

  async getChats(userId: ReqUser['id']): Promise<GetChatDTO[]> {
    // TODO maybe can use typeorm where

    const response = await this.table.find({
      relations: {
        lastMessage: { sender: true },
      },
    });

    const chats = response.filter(({ members }) => members.includes(userId));

    const promises = chats.map(async ({ members, ...other }) => {
      const companionId = members.filter((id) => id !== userId)[0];

      const title = await this.usersService.getFullname(companionId);

      return { title, companionId, ...other };
    });

    return Promise.all(promises);
  }

  async updateChat(data: any): Promise<void> {
    await this.table.save(data);
  }
}

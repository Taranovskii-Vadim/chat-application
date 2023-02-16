import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersService } from 'src/user/user.service';

import { Chat } from './chat.entity';
import { Conversation, GetChatDTO } from './types';

// TODO maybe later develop group chats

@Injectable()
export class ChatsService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Chat) private readonly table: Repository<Chat>,
  ) {}

  // setChatLastMessageId(chatId: number, messageId: string): void {
  //   this.chats = this.chats.filter((item) => {
  //     if (item.id === chatId) {
  //       item.lastMessageId = messageId;
  //     }

  //     return item;
  //   });
  // }

  async getChats(userId: number): Promise<GetChatDTO[]> {
    // TODO got no idea how to query userId in members

    const dbResult = await this.table.find({
      relations: { lastMessage: true },
    });

    const chats = dbResult.filter(({ members }) => members.includes(userId));

    const promises = chats.map(async ({ members, ...other }) => {
      const companionId = members.filter((id) => id !== userId)[0];

      const title = await this.usersService.getFullname(companionId);

      return { title, companionId, ...other };
    });

    //  TODO we dont expand sender object in lastmessage

    return Promise.all(promises);
  }

  async getChat(userId: number, id: number): Promise<Conversation> {
    const dbResult = await this.table.findOne({ where: { id } });

    if (!dbResult) throw new Error('Chat not found');

    const companionId = dbResult.members.filter((id) => id !== userId)[0];

    const title = await this.usersService.getFullname(companionId);

    return { id: dbResult.id, title, companionId };
  }
}

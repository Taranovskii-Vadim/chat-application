import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ReqUser } from 'src/types';
import { UsersService } from 'src/user/user.service';
import { MessagesService } from 'src/message/message.service';

import { Chat } from './chat.entity';
import { GetChatDTO } from './chat.dto';

// TODO maybe later develop group chats

@Injectable()
export class ChatsService {
  constructor(
    private usersService: UsersService,
    private messagesService: MessagesService,
    @InjectRepository(Chat) private readonly table: Repository<Chat>,
  ) {}

  async getChats(userId: ReqUser['id']): Promise<GetChatDTO[]> {
    // TODO we can create interceptor which can transform our data before send it to client
    // TODO maybe can use typeorm where

    const response = await this.table.find({
      relations: { pinnedMessage: true },
    });

    const chats = response.filter(({ members }) => members.includes(userId));

    const promises = chats.map(async ({ members, ...other }) => {
      const companionId = members.filter((id) => id !== userId)[0];

      const title = await this.usersService.getFullname(companionId);
      const unReadCount = await this.messagesService.getUnReadCount(
        other.id,
        companionId,
      );

      const lastMessage = await this.messagesService.getChatLastMessage(
        other.id,
      );

      return { title, companionId, unReadCount, lastMessage, ...other };
    });

    return Promise.all(promises);
  }
}

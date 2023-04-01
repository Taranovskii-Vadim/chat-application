import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getChat(id: number, userId: number): Promise<GetChatDTO> {
    const response = await this.table.findOne({
      where: { id },
      relations: { pinnedMessage: true },
    });

    if (!response) throw new NotFoundException();

    const companionId = response.members.filter((id) => id !== userId)[0];

    const title = await this.usersService.getFullname(companionId);
    const unReadCount = await this.messagesService.getUnReadCount(
      id,
      companionId,
    );

    const lastMessage = await this.messagesService.getChatLastMessage(id);

    return {
      id,
      title,
      companionId,
      unReadCount,
      lastMessage,
      pinnedMessage: response.pinnedMessage,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }
}

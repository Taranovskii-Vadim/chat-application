import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MessageDTO } from 'src/messages/types';
import { UsersService } from 'src/user/user.service';
import { MessagesService } from 'src/messages/messages.service';

import { Chat } from './chat.entity';
import { Conversation, GetChatDTO } from './types';

// TODO maybe later develop group chats

@Injectable()
export class ChatsService {
  constructor(
    private usersService: UsersService,
    // private messagesService: MessagesService,
    @InjectRepository(Chat) private readonly table: Repository<Chat>,
  ) {}

  private getChatLastMessage(id?: string): any {
    return '';
    // return this.messagesService.getMessage(id);
  }

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
    // TODO handle error
    const dbResult = await this.table.find();

    const chats = dbResult.filter(({ members }) => members.includes(userId));

    const promises = chats.map(async ({ members, lastMessageId, ...other }) => {
      const companionId = members.filter((id) => id !== userId)[0];

      const title = await this.usersService.getFullname(companionId);
      const lastMessage = this.getChatLastMessage(lastMessageId);

      return { title, lastMessage, companionId, ...other };
    });

    return Promise.all(promises);
  }

  async getChat(userId: number, id: number): Promise<Conversation> {
    try {
      const dbResult = await this.table.findOne({ where: { id } });

      if (!dbResult) throw new Error('Chat not found');

      const companionId = dbResult.members.filter((id) => id !== userId)[0];

      const title = await this.usersService.getFullname(companionId);

      return { id: dbResult.id, title, companionId };
    } catch (e) {
      return e;
    }
  }
}

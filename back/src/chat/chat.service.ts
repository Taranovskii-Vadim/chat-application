import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MessageDTO } from 'src/messages/types';
import { UsersService } from 'src/user/user.service';
import { MessagesService } from 'src/messages/messages.service';

import { Chat } from './chat.entity';
import { GetChatDTO } from './types';

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

  // getChat(userId: number, chatId: number): Conversation | undefined {
  //   const result = this.chats.find(({ id }) => id === chatId);

  //   if (!result) return undefined;

  //   const filtered = result.members.filter((id) => id !== userId);
  //   const title = this.getChatTitle(filtered);

  //   return {
  //     title,
  //     id: result.id,
  //     members: filtered,
  //   };
  // }

  // createChat({ senderId, receiverId }: NewChatDTO): number {
  //   const id = this.chats.length + 1;

  //   // TODO put here not id but full short user info
  //   // this.chats.push({ id, members: [senderId, receiverId] });

  //   return id;
  // }
}

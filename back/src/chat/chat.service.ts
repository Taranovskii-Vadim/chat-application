import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from 'src/user/user.service';
import { MessagesService } from 'src/message/message.service';

import { Chat } from './entities/chat.entity';
import { ReceiveChatDTO } from './dto/receive-chat.dto';



@Injectable()
export class ChatsService {
  constructor(
    private usersService: UsersService,
    private messagesService: MessagesService,
    @InjectRepository(Chat) private readonly table: Repository<Chat>,
  ) {}

  private async prepare(userId: number, data: Chat): Promise<ReceiveChatDTO> {
    const { id, members, ...other } = data;

    const memberId = members.filter((id) => id !== userId)[0];
    const title = await this.usersService.getFullname(memberId);
    const lastMessage = await this.messagesService.getChatLastMessage(id);
    const unReadCount = await this.messagesService.getUnReadCount(id, memberId);

    return { id, title, lastMessage, unReadCount, memberId, ...other };
  }

  async getChats(userId: number): Promise<ReceiveChatDTO[]> {
    // TODO we can create interceptor which can transform our data before send it to client
    // TODO maybe can use typeorm where

    const response = await this.table.find();
    const chats = response.filter(({ members }) => members.includes(userId));

    const result = chats.map((item) => this.prepare(userId, item));

    return Promise.all<ReceiveChatDTO>(result);
  }

  async getChat(id: number, userId: number): Promise<ReceiveChatDTO> {
    const response = await this.table.findOne({ where: { id } });

    if (!response) throw new NotFoundException();

    return this.prepare(userId, response);
  }
}

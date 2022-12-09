import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Chat, NewChatDTO } from './types';
import { ChatsService } from './chats.service';

// TODO think how to solve base andpoint /api
@Controller('/api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':chatId')
  getChat(@Param('chatId') chatId: string): Chat | undefined {
    return this.chatsService.getChat(+chatId);
  }

  @Get('/user/:userId')
  getChats(@Param('userId') userId: string): Chat[] {
    return this.chatsService.getChats(+userId);
  }

  @Post()
  createChat(@Body() body: NewChatDTO): number {
    return this.chatsService.createChat(body);
  }
}

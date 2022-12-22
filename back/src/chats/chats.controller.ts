import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { ChatsService } from './chats.service';

import { Chat, NewChatDTO } from './types';

// TODO think how to solve base andpoint /api
@Controller('/api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':chatId')
  getChat(@Param('chatId') chatId: string): Chat | undefined {
    return this.chatsService.getChat(+chatId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  getChats(@Param('userId') userId: string): Chat[] {
    return this.chatsService.getChats(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createChat(@Body() body: NewChatDTO): number {
    return this.chatsService.createChat(body);
  }
}

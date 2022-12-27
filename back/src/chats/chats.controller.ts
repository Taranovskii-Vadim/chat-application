import {
  Body,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { ChatsService } from './chats.service';

import { ExpandedChat, NewChatDTO } from './types';

// TODO think how to solve base andpoint /api
@Controller('/api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':chatId')
  getChat(
    @Param('chatId') chatId: string,
    @Req() req: any,
  ): ExpandedChat | undefined {
    return this.chatsService.getChat(req.user.id, +chatId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  getChats(@Param('userId') userId: string): ExpandedChat[] {
    return this.chatsService.getChats(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createChat(@Body() body: NewChatDTO): number {
    return this.chatsService.createChat(body);
  }
}

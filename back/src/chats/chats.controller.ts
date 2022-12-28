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
import { Chat, ChatWithTitle, NewChatDTO } from './types';

// TODO think how to solve base andpoint /api
@Controller('/api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':chatId')
  getChat(@Param('chatId') chatId: string, @Req() req: any): Chat | undefined {
    return this.chatsService.getChat(req.user.id, +chatId);
  }

  // TODO why we must provide userId from front if we have req.user
  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  getChats(@Param('userId') userId: string): ChatWithTitle[] {
    return this.chatsService.getChats(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createChat(@Body() body: NewChatDTO): number {
    return this.chatsService.createChat(body);
  }
}

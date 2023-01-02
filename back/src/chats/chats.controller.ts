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
import { Chat, Conversation, NewChatDTO } from './types';

// TODO think how to solve base andpoint /api
@Controller('/api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getChats(@Req() req: any): Chat[] {
    return this.chatsService.getChats(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createChat(@Body() body: NewChatDTO): number {
    return this.chatsService.createChat(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:chatId')
  getChat(
    @Param('chatId') chatId: string,
    @Req() req: any,
  ): Conversation | undefined {
    return this.chatsService.getChat(req.user.id, +chatId);
  }
}

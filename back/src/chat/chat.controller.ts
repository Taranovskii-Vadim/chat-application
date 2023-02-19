import { Get, Param, UseGuards, Controller, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

import { Req } from 'src/types';

import { ChatsService } from './chat.service';
import { Conversation, GetChatDTO } from './types';

@Controller('/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getChats(@Request() req: Req): Promise<GetChatDTO[]> {
    return this.chatsService.getChats(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:chatId')
  async getChat(
    @Param('chatId') chatId: string,
    @Request() req: Req,
  ): Promise<Conversation> {
    return this.chatsService.getChat(req.user.id, +chatId);
  }
}

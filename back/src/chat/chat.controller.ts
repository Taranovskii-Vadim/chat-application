import { Get, Param, Req, UseGuards, Controller } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { Chat } from './chat.entity';
import { ChatsService } from './chat.service';
import { Conversation, GetChatDTO } from './types';

@Controller('/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getChats(@Req() req: any): Promise<GetChatDTO[]> {
    return this.chatsService.getChats(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:chatId')
  async getChat(
    @Param('chatId') chatId: string,
    @Req() req: any,
  ): Promise<Conversation> {
    return this.chatsService.getChat(req.user.id, +chatId);
  }
}

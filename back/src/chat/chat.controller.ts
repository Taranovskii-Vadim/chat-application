import {
  Get,
  Request,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { Req } from 'src/types';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

import { GetChatDTO } from './chat.dto';
import { ChatsService } from './chat.service';

@Controller('/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getChats(@Request() req: Req): Promise<GetChatDTO[]> {
    return this.chatsService.getChats(req.user.id);
  }
}

import {
  Get,
  Put,
  Body,
  Request,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

import { Req } from 'src/types';

import { ChatsService } from './chat.service';
import { GetChatDTO } from './types';

@Controller('/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getChats(@Request() req: Req): Promise<GetChatDTO[]> {
    return this.chatsService.getChats(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateMessage(@Body() body: any): Promise<void> {
    return this.chatsService.updateChat(body);
  }
}

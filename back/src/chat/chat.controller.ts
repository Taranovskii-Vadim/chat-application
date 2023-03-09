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

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateChat(@Body() body: any): Promise<void> {
    return this.chatsService.updateChat(body);
  }
}

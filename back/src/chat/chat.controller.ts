import {
  Get,
  Put,
  Body,
  Param,
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

type PinQuery = { id: string; messageId: string };

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
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id/pin/:messageId')
  async pinMessage(@Param() query: PinQuery) {
    return this.chatsService.updateChat({
      id: +query.id,
      pinnedMessage: { id: +query.messageId },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateChat(@Body() body: any): Promise<void> {
    return this.chatsService.updateChat(body);
  }
}

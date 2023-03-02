import {
  Get,
  Put,
  Body,
  Param,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

import { Req } from 'src/types';
import { UpdatePayloadDTO } from './chat.dto';

import { ChatsService } from './chat.service';
import { GetChatDTO } from './types';

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
  ): Promise<GetChatDTO> {
    return this.chatsService.getChat(req.user.id, +chatId);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateMessage(@Body() body: any): Promise<void> {
    return this.chatsService.updateChat(body);
  }
}

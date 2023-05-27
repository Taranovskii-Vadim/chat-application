import {
  Get,
  Param,
  UseGuards,
  Controller,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { User } from 'src/utils/decorators';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

import { ChatsService } from './chat.service';
import { ReceiveChatDTO } from './dto/receive-chat.dto';

@Controller('/chats')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  async getChats(@User('id') id: number): Promise<ReceiveChatDTO[]> {
    return this.chatsService.getChats(id);
  }

  @Get(':id')
  async getChat(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ): Promise<ReceiveChatDTO> {
    return this.chatsService.getChat(id, userId);
  }
}

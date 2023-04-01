import {
  Get,
  Param,
  UseGuards,
  Controller,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { User } from 'src/decorators';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

import { GetChatDTO } from './chat.dto';
import { ChatsService } from './chat.service';

@Controller('/chats')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  async getChats(@User('id') id: number): Promise<GetChatDTO[]> {
    return this.chatsService.getChats(id);
  }

  @Get(':id')
  async getChat(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ): Promise<GetChatDTO> {
    return this.chatsService.getChat(id, userId);
  }
}

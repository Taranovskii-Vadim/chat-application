import {
  Get,
  Put,
  Post,
  Body,
  Param,
  UseGuards,
  Controller,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

import { Message } from './message.entity';
import { MessagesService } from './message.service';
import { InsertPayloadDTO } from './message.dto';

@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':chatId')
  async getMessages(
    @Param('chatId', ParseIntPipe) chatId: number,
  ): Promise<Message[]> {
    return this.messagesService.getMessages(chatId);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createMessage(@Body() body: InsertPayloadDTO): Promise<Message | null> {
    return this.messagesService.createMessage(body);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateMessage(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.messagesService.updateMessage(id, body);
  }
}

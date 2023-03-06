import {
  Get,
  Put,
  Post,
  Body,
  Param,
  UseGuards,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

import { Message } from './message.entity';
import { MessagesService } from './message.service';
import { InsertPayloadDTO } from './message.dto';

type Query = { id: string };

@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':chatId')
  async getMessages(@Param('chatId') chatId: string): Promise<Message[]> {
    return this.messagesService.getMessages(+chatId);
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
  async updateMessage(@Param() query: Query, @Body() body: any) {
    return this.messagesService.updateMessage(+query.id, body);
  }
}

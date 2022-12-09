import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { Message, NewMessageDTO } from './types';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':chatId')
  getMessages(@Param('chatId') chatId: string): Message[] {
    return this.messagesService.getMessages(+chatId);
  }

  @Post()
  createMessage(@Body() body: NewMessageDTO): number {
    return this.messagesService.createMessage(body);
  }
}

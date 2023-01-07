import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { MessagesService } from './messages.service';

import { Message } from './types';

// TODO add guards everywhere
@Controller('/api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':chatId')
  getMessages(@Param('chatId') chatId: string): Message[] {
    return this.messagesService.getMessages(+chatId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createMessage(@Body() body: Message): void {
    return this.messagesService.createMessage(body);
  }
}

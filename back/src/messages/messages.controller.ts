import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { NewMessageDTO } from './types';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createMessage(@Body() body: NewMessageDTO): number {
    return this.messagesService.createMessage(body);
  }
}

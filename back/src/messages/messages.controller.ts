import { Controller, Post, Body } from '@nestjs/common';

import { NewMessageDTO } from './types';

@Controller('messages')
export class MessagesController {
  @Post()
  createMessage(@Body() body: NewMessageDTO): string {
    return `i got this text ${body.text}`;
  }
}

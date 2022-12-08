import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { NewChatDTO } from './types';

@Controller('chats')
export class ChatsController {
  @Get(':userId')
  receiveUserChat(@Param('userId') userId: string) {}

  @Post()
  createChat(@Body() body: NewChatDTO) {}
}

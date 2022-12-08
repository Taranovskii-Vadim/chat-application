import {
  Body,
  Controller,
  Get,
  Next,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { NextFunction } from 'express';

import { NewChatDTO } from './types';

@Controller('chats')
export class ChatsController {
  @Get(':userId')
  // we can access to express req res and next function
  receiveUserChat(
    @Param('userId') userId: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {}

  @Post()
  createChat(@Body() body: NewChatDTO) {}
}

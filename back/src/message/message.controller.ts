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
import { InsertPayloadDTO, ResultDTO, UpdatePayloadDTO } from './message.dto';

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
  @Post()
  async createMessage(@Body() body: InsertPayloadDTO): Promise<ResultDTO> {
    return this.messagesService.createMessage(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateMessage(@Body() body: UpdatePayloadDTO): Promise<void> {
    return this.messagesService.updateMessage(body);
  }
}

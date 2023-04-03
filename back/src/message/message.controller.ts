import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Controller,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { User } from 'src/decorators';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

import { Message } from './message.entity';
import { MessagesService } from './message.service';
import { InsertPayloadDTO, UpdatePayloadDTO } from './message.dto';

@Controller('/messages')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id')
  async findAll(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ): Promise<Message[]> {
    return this.messagesService.getMessages(id, userId);
  }

  @Post()
  async create(@Body() body: InsertPayloadDTO): Promise<Message> {
    return this.messagesService.createMessage(body);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePayloadDTO,
  ) {
    return this.messagesService.updateMessage(id, body);
  }
}

import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Request,
  UseGuards,
  Controller,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

import { Req } from 'src/types';

import { Message } from './message.entity';
import { MessagesService } from './message.service';
import { InsertPayloadDTO } from './message.dto';

@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findAll(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: Req,
  ): Promise<Message[]> {
    return this.messagesService.getMessages(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() body: InsertPayloadDTO): Promise<Message | null> {
    return this.messagesService.createMessage(body);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.messagesService.updateMessage(id, body);
  }
}

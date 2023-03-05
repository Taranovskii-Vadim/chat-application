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
import { InsertPayloadDTO, UpdatePayloadDTO } from './message.dto';

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

  // TODO if we need id handle it with @Param not in body. Because we can pipe it
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':action/:id')
  async updateMessage(
    @Param() { id, action }: { id: string; action: 'update' | 'pin' },
    @Body() body: UpdatePayloadDTO,
  ): Promise<Message | null> {
    if (action === 'update') {
      return this.messagesService.updateMessage(+id, body);
    } else {
      // TODO here we must create pin method in service
      return this.messagesService.updateMessage(+id, body);
    }
  }
}

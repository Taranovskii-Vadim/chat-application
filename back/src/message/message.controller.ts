import { Get, Param, UseGuards, Controller, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { Message } from './message.entity';
import { MessagesService } from './message.service';
import { CreateMessagePayloadDTO, CreateMessageResultDTO } from './message.dto';

// TODO add guards everywhere
@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':chatId')
  async getMessages(@Param('chatId') chatId: string): Promise<Message[]> {
    return this.messagesService.getMessages(+chatId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMessage(
    @Body() body: CreateMessagePayloadDTO,
  ): Promise<CreateMessageResultDTO> {
    return this.messagesService.createMessage(body);
  }

  // @UseGuards(JwtAuthGuard)
  // @Put()
  // updateMessage(@Body() body: Partial<Message>): void {
  //   return this.messagesService.updateMessage(body);
  // }
}

import { Module } from '@nestjs/common';
import { ChatsService } from 'src/chats/chats.service';

import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}

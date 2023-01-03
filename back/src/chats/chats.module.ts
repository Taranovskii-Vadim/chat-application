import { Module } from '@nestjs/common';

import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { UsersModule } from 'src/users/users.module';
import { MessagesService } from 'src/messages/messages.service';

@Module({
  imports: [UsersModule],
  controllers: [ChatsController],
  providers: [ChatsService, MessagesService],
})
export class ChatsModule {}

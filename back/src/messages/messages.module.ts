import { Module } from '@nestjs/common';
// import { ChatsService } from 'src/chats/chats.service';
import { UsersModule } from 'src/user/user.module';

import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [UsersModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}

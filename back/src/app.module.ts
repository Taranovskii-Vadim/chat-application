import { Module } from '@nestjs/common';

import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';

// TODO include postgreSQL in the future
@Module({
  imports: [MessagesModule, ChatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

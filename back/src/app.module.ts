import { Module } from '@nestjs/common';

import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';

// TODO include postgreSQL in the future maybe
@Module({
  imports: [MessagesModule, ChatsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

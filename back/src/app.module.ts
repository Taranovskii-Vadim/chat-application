import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsController } from './chats/chats.controller';
import { UsersController } from './users/users.controller';
import { MessagesController } from './messages/messages.controller';

@Module({
  imports: [],
  controllers: [AppController, ChatsController, UsersController, MessagesController],
  providers: [AppService],
})
export class AppModule {}

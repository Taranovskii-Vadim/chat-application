import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { UsersModule } from 'src/users/users.module';
import { MessagesService } from 'src/messages/messages.service';

import { Chat } from './chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UsersModule],
  controllers: [ChatsController],
  providers: [ChatsService, MessagesService],
})
export class ChatsModule {}

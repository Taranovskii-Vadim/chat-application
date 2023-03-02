import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { UsersModule } from 'src/user/user.module';
import { ChatsModule } from 'src/chat/chat.module';
import { MessagesService } from './message.service';
import { MessagesController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule, ChatsModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}

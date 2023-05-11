import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatsService } from './chat.service';
import { UsersModule } from 'src/user/user.module';
import { ChatsController } from './chat.controller';
import { MessagesModule } from 'src/message/message.module';

import { Chat } from './chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UsersModule, MessagesModule],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}

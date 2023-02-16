import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatsService } from './chat.service';
import { UsersModule } from 'src/user/user.module';
import { ChatsController } from './chat.controller';

import { Chat } from './chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UsersModule],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}

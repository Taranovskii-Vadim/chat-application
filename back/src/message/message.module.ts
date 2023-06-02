import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { Message } from './entities/message.entity';
import { MessagesService } from './message.service';
import { MessagesController } from './message.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    MulterModule.register({ dest: './files' }),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}

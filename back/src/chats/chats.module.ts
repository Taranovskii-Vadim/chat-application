import { Module } from '@nestjs/common';

import { ChatsController } from './chats.controller';

@Module({ controllers: [ChatsController] })
export class ChatsModule {}

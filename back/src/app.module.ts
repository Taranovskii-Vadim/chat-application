import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Chat } from './chat/chat.entity';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/message.entity';

// TODO refactor folder structure, define where storage typeORM data
// TODO refactor code below
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Chat, Message],
        synchronize: true,
      }),
    }),
    MessagesModule,
    ChatsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

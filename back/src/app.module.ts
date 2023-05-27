import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './user/user.entity';
import { ChatsModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';
import { Message } from './message/message.entity';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { MessagesModule } from './message/message.module';
// import { SessionAuth } from './session-auth/session-auth.module';

@Module({
  imports: [
    ChatsModule,
    JwtAuthModule,
    // SessionAuth,
    MessagesModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

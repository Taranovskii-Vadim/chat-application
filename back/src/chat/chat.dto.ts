import { IsNumber, IsString, IsObject } from 'class-validator';

import { Message } from 'src/message/message.entity';

export class GetChatDTO {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  companionId: number;

  @IsObject()
  lastMessage?: Message;

  @IsNumber()
  unReadCount: number;
}

import { IsNumber, IsString, IsObject, IsDate } from 'class-validator';

import { Message } from 'src/message/entities/message.entity';

export class ReceiveChatDTO {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsNumber()
  memberId: number;

  @IsNumber()
  unReadCount: number;

  @IsObject()
  lastMessage: Message | null;
}

import { IsNumber, IsString, IsObject, IsDate } from 'class-validator';

import { Message } from 'src/message/message.entity';

export class GetChatDTO {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsNumber()
  companionId: number;

  @IsNumber()
  unReadCount: number;

  @IsObject()
  lastMessage: Message | null;

  @IsObject()
  pinnedMessage: Message | null;
}

import { IsNumber, IsString, IsObject } from 'class-validator';

import { Message } from 'src/message/message.entity';

class CommonDTO {
  @IsNumber()
  unReadCount: number;
}

export class UpdatePayloadDTO extends CommonDTO {}

export class GetChatDTO extends CommonDTO {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  companionId: number;

  @IsObject()
  lastMessage?: Message;
}

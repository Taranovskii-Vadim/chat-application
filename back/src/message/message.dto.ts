import { IsString, IsNumber } from 'class-validator';

class PayloadDTO {
  @IsString()
  text: string;
}

export class InsertPayloadDTO extends PayloadDTO {
  @IsNumber()
  chatId: number;

  // @IsNumber()
  // repliedId: number;
  @IsNumber()
  senderId: number;
}

// export class UpdateDTO extends PayloadDTO {}

import { IsString, IsNumber } from 'class-validator';

// TODO why we use class-validator for define income and outcome types????

class PayloadDTO {
  @IsString()
  text: string;
}

export class InsertPayloadDTO extends PayloadDTO {
  @IsNumber()
  chatId: number;

  @IsNumber()
  repliedId: number;

  @IsNumber()
  senderId: number;
}

// export class UpdateDTO extends PayloadDTO {}

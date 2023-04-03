import { IsString, IsNumber } from 'class-validator';

export class UpdatePayloadDTO {
  @IsString()
  text: string;
}

export class InsertPayloadDTO extends UpdatePayloadDTO {
  @IsNumber()
  chatId: number;

  @IsNumber()
  senderId: number;
}

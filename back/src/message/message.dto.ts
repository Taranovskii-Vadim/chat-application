import { IsString, IsNumber } from 'class-validator';

export class InsertPayloadDTO {
  @IsString()
  text: string;

  @IsNumber()
  chatId: number;

  @IsNumber()
  senderId: number;
}

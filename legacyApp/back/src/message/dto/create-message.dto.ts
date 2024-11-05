import { IsString, IsNumber } from 'class-validator';

export class CreateDTO {
  @IsString()
  text: string;

  @IsNumber()
  chatId: number;

  @IsNumber()
  senderId: number;

  @IsNumber()
  repliedId: number;
}

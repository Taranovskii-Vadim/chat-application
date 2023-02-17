import { IsString, IsNumber, IsDate } from 'class-validator';

// TODO modify front we dont expect id and createDate form front here

// TODO why we use class-validator for define income and outcome types????
export class CreateMessagePayloadDTO {
  @IsString()
  text: string;

  @IsNumber()
  chatId: number;

  @IsNumber()
  repliedId: number;

  @IsNumber()
  senderId: number;
}

export class CreateMessageResultDTO {
  @IsNumber()
  id: number;

  @IsDate()
  createdAt: string;
}

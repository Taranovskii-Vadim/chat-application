import { IsString, IsNumber, IsDate } from 'class-validator';

// TODO modify front we dont expect id and createDate form front here

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

export class UpdatePayloadDTO extends PayloadDTO {
  @IsNumber()
  id: number;
}

export class ResultDTO {
  @IsNumber()
  id: number;

  @IsNumber()
  senderId: number;

  @IsString()
  text: string;

  @IsDate()
  createdAt: string;
}

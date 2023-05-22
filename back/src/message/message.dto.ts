import { IsString, IsNumber, IsBoolean } from 'class-validator';

class CommonDTO {
  @IsString()
  text: string;
}

export class UpdateDTO extends CommonDTO {
  @IsString()
  filePath: string;

  @IsBoolean()
  isEdited: boolean;
}

export class InsertPayloadDTO extends CommonDTO {
  @IsNumber()
  chatId: number;

  @IsNumber()
  senderId: number;

  @IsNumber()
  repliedId: number;
}

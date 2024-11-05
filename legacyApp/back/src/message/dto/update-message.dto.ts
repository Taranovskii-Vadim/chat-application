import { IsString, IsBoolean } from 'class-validator';

export class UpdateDTO {
  @IsString()
  text: string;

  @IsString()
  filePath: string;

  @IsBoolean()
  isEdited: boolean;
}

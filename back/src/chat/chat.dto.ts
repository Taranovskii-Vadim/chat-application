import { IsNumber } from 'class-validator';

export class UpdatePayloadDTO {
  @IsNumber()
  id: number;

  @IsNumber()
  unReadCount: number;
}

import { IsString } from 'class-validator';
import { ValidationMessages } from '../enum';

export class CreatePlanningDto {
  @IsString({
    message: ValidationMessages.nameRequired,
  })
  name: string;
}

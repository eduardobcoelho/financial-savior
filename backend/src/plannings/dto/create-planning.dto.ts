import { IsString, MaxLength } from 'class-validator';
import { ValidationMessages } from '../enum';

export class CreatePlanningDto {
  @IsString({
    message: ValidationMessages.nameRequired,
  })
  @MaxLength(50, {
    message: ValidationMessages.nameMaxLength,
  })
  name: string;
}

import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ValidationMessages } from '../enum';

export class CreateCategoryDto {
  @IsString({
    message: ValidationMessages.nameRequired,
  })
  @MaxLength(50, {
    message: ValidationMessages.nameMaxLength,
  })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000, {
    message: ValidationMessages.descriptionMaxLength,
  })
  description: string;

  @IsString({ message: ValidationMessages.colorRequired })
  @MaxLength(7, {
    message: ValidationMessages.colorMaxLength,
  })
  color: string;
}

import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ValidationMessages } from '../enum';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
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

  @IsString()
  @IsOptional()
  @MaxLength(7, {
    message: ValidationMessages.colorMaxLength,
  })
  color: string;
}

import { IsEnum, IsString, MaxLength } from 'class-validator';
import { SheetType, ValidationMessages } from '../enum';

export class CreateSheetDto {
  @IsString({
    message: ValidationMessages.nameRequired,
  })
  @MaxLength(100, {
    message: ValidationMessages.nameMaxLength,
  })
  name: string;

  @IsEnum(SheetType, {
    message: ValidationMessages.typeInvalid,
  })
  type: SheetType;
}

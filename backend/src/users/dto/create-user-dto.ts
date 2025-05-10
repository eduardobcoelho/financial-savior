import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ValidationMessages } from '../enum';

export class CreateUserDto {
  @IsString({
    message: ValidationMessages.emailRequired,
  })
  @IsEmail(
    {},
    {
      message: ValidationMessages.emailInvalid,
    },
  )
  email: string;

  @IsString({
    message: ValidationMessages.passwordRequired,
  })
  @IsStrongPassword(
    {
      minLength: 10,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    {
      message: ValidationMessages.passwordWeak,
    },
  )
  password: string;
}

import { IsEmail, IsNumber, IsString } from 'class-validator';

export class TokenDto {
  @IsNumber()
  userTokenId: number;

  @IsNumber()
  sub: number;

  @IsEmail()
  @IsString()
  email: string;
}

import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNumber()
  sub: number;

  @IsEmail()
  @IsString()
  email: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}

import { IsJSON, IsString } from 'class-validator';

export class LoginResponseDto {
  @IsString()
  token: string;

  @IsString()
  refreshToken: string;

  @IsJSON()
  user: {
    id: number;
    email: string;
  };
}

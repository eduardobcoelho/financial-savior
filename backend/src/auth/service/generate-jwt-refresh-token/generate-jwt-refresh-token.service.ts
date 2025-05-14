import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface IGenerateJwtRefreshTokenServiceData {
  userId: number;
  email: string;
}

export interface IGenerateJwtRefreshTokenService {
  exec: (data: IGenerateJwtRefreshTokenServiceData) => Promise<string>;
}

@Injectable()
export class GenerateJwtRefreshTokenService
  implements IGenerateJwtRefreshTokenService
{
  constructor(private jwtService: JwtService) {}

  async exec({ userId, email }: IGenerateJwtRefreshTokenServiceData) {
    const payload = { sub: userId, email };
    return await this.jwtService.signAsync(payload);
  }
}

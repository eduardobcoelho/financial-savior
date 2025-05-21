import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface IGenerateJwtRefreshTokenServiceData {
  userId: number;
  userEmail: string;
}

export interface IGenerateJwtRefreshTokenService {
  exec: (data: IGenerateJwtRefreshTokenServiceData) => Promise<string>;
}

@Injectable()
export class GenerateJwtRefreshTokenService
  implements IGenerateJwtRefreshTokenService
{
  constructor(private jwtService: JwtService) {}

  async exec({ userId, userEmail }: IGenerateJwtRefreshTokenServiceData) {
    const payload = { sub: userId, email: userEmail, createdAt: new Date() };
    return await this.jwtService.signAsync(payload, {
      expiresIn: process.env.NEST_JWT_REFRESH_EXPIRES,
    });
  }
}

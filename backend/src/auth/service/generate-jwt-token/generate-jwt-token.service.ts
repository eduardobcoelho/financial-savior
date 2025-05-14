import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface IGenerateJwtTokenServiceData {
  userTokenId: number;
  userId: number;
  userEmail: string;
}

export interface IGenerateJwtTokenService {
  exec: (data: IGenerateJwtTokenServiceData) => Promise<string>;
}

@Injectable()
export class GenerateJwtTokenService implements IGenerateJwtTokenService {
  constructor(private jwtService: JwtService) {}

  async exec({ userTokenId, userId, userEmail }: IGenerateJwtTokenServiceData) {
    const payload = { userTokenId, sub: userId, email: userEmail };
    return await this.jwtService.signAsync(payload);
  }
}

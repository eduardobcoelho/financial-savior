import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface IGenerateJwtTokenServiceData {
  id: number;
  userId: number;
  email: number;
}

export interface IGenerateJwtTokenService {
  exec: (data: IGenerateJwtTokenServiceData) => Promise<string>;
}

@Injectable()
export class GenerateJwtTokenService implements IGenerateJwtTokenService {
  constructor(private jwtService: JwtService) {}

  async exec({ id, userId, email }: IGenerateJwtTokenServiceData) {
    const payload = { id, sub: userId, email };
    return await this.jwtService.signAsync(payload);
  }
}

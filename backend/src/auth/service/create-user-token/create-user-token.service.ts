import { Inject, Injectable } from '@nestjs/common';
import { IUserTokenRepository } from 'src/auth/repository/user-token.repository';
import { UserTokenEntity } from 'src/auth/entity/user-token.entity';

export interface ICreateUserTokenData {
  userId: number;
  refreshToken: string;
  revoked: boolean;
  expiresAt: Date;
}

export interface ICreateUserTokenService {
  exec: (data: ICreateUserTokenData) => Promise<UserTokenEntity>;
}

@Injectable()
export class CreateUserTokenService implements ICreateUserTokenService {
  constructor(
    @Inject('IUserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
  ) {}

  async exec(data: ICreateUserTokenData) {
    return await this.userTokenRepository.create(data);
  }
}

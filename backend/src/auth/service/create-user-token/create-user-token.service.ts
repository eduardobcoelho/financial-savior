import { Inject, Injectable } from '@nestjs/common';
import { IUserTokenRepository } from 'src/auth/repository/user-token.repository';
import { UserTokenEntity } from 'src/auth/entity/user-token.entity';

export interface ICreateUserTokenService {
  exec: (userId: number) => Promise<UserTokenEntity>;
}

@Injectable()
export class CreateUserTokenService implements ICreateUserTokenService {
  constructor(
    @Inject('IUserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
  ) {}

  async exec(userId: number) {
    return await this.userTokenRepository.create(userId);
  }
}

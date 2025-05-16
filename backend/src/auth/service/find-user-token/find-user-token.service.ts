import { Inject, Injectable } from '@nestjs/common';
import { UserTokenEntity } from 'src/auth/entity/user-token.entity';
import { IUserTokenRepository } from 'src/auth/repository/user-token.repository';

export interface IFindUserTokenService {
  exec: (userTokenId: number) => Promise<UserTokenEntity | null>;
}

@Injectable()
export class FindUserTokenService implements IFindUserTokenService {
  constructor(
    @Inject('IUserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
  ) {}

  async exec(userTokenId: number) {
    return await this.userTokenRepository.find(userTokenId);
  }
}

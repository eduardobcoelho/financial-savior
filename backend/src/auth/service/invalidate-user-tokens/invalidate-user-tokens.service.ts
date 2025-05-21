import { Inject, Injectable } from '@nestjs/common';
import { IUserTokenRepository } from 'src/auth/repository/user-token.repository';

export interface IInvalidateUserTokensService {
  exec: (userId: number) => Promise<void>;
}

@Injectable()
export class InvalidateUserTokensService
  implements IInvalidateUserTokensService
{
  constructor(
    @Inject('IUserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,
  ) {}

  async exec(userId: number) {
    return await this.userTokenRepository.invalidateUserTokens(userId);
  }
}

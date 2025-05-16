import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserTokenEntity } from 'src/auth/entity/user-token.entity';
import { ValidationMessages } from 'src/auth/enum';
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
    const userToken = await this.userTokenRepository.find(userTokenId);
    if (!userToken)
      throw new NotFoundException(ValidationMessages.userTokenNotFounded);

    return userToken;
  }
}

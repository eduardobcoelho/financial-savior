import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTokenEntity } from '../entity/user-token.entity';

export interface IUserTokenRepository {
  create: (userId: number) => Promise<UserTokenEntity>;
  find: (userTokenId: number) => Promise<UserTokenEntity | null>;
}

@Injectable()
export class UserTokenRepository implements IUserTokenRepository {
  constructor(
    @InjectRepository(UserTokenEntity)
    private readonly repository: Repository<UserTokenEntity>,
  ) {}

  async create(userId: number) {
    const userToken = this.repository.create({
      userId,
      revoked: false,
    });

    return await this.repository.save(userToken);
  }

  async find(userTokenId: number) {
    return await this.repository.findOneBy({
      id: userTokenId,
    });
  }
}

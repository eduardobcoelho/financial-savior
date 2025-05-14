import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTokenEntity } from '../entity/user-token.entity';
import { addHours } from 'date-fns';

interface CreateUserTokenData {
  userId: number;
  refreshToken: string;
}

export interface IUserTokenRepository {
  create: (data: CreateUserTokenData) => Promise<UserTokenEntity>;
}

@Injectable()
export class UserTokenRepository implements IUserTokenRepository {
  constructor(
    @InjectRepository(UserTokenEntity)
    private readonly repository: Repository<UserTokenEntity>,
  ) {}

  async create({ userId, refreshToken }: CreateUserTokenData) {
    const expiresAt = addHours(new Date(), 1);

    const userToken = this.repository.create({
      userId,
      refreshToken,
      expiresAt,
      revoked: false,
    });

    return await this.repository.save(userToken);
  }
}

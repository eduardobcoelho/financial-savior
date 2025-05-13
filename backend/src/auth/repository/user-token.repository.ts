import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTokenEntity } from '../entity/user-token.entity';

interface CreateUserTokenData {
  userId: number;
  refreshToken: string;
  revoked: boolean;
  expiresAt: Date;
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

  async create(data: CreateUserTokenData) {
    const userToken = this.repository.create(data);
    return await this.repository.save(userToken);
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTokenEntity } from '../entity/user-token.entity';

export interface IUserTokenRepository {
  create: (userId: number) => Promise<UserTokenEntity>;
  find: (userTokenId: number) => Promise<UserTokenEntity | null>;
  invalidateUserTokens: (userId: number) => Promise<void>;
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

  async invalidateUserTokens(userId: number) {
    const tokenExpireTimeHours = Number(
      `${process.env.NEST_JWT_EXPIRES || '1h'}`.replace('h', ''),
    );
    const now = new Date();
    const limitDateTokenValid = new Date(
      now.getTime() - tokenExpireTimeHours * 60 * 60 * 1000,
    );

    await this.repository
      .createQueryBuilder()
      .update()
      .set({ revoked: true })
      .where('userId = :userId', { userId })
      .andWhere('createdAt BETWEEN :limitDateTokenValid AND :now', {
        limitDateTokenValid,
        now,
      })
      .execute();
  }
}

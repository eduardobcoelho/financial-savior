import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';

export interface IAuthUserRepository {
  findPassword: (userId: number) => Promise<string | null>;
}

@Injectable()
export class AuthUserRepository implements IAuthUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findPassword(userId: number) {
    const user = await this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: userId })
      .getOne();

    return user?.password || null;
  }
}

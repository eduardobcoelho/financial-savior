import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user-dto';
import { UserEntity } from '../entity/user.entity';

export interface IUserRepository {
  create: (data: CreateUserDto) => Promise<UserEntity>;
  findByEmail: (email: string) => Promise<Omit<UserEntity, 'password'> | null>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    const user = this.repository.create(data);
    return await this.repository.save(user);
  }

  async findByEmail(email: string) {
    return await this.repository.findOneBy({
      email,
    });
  }
}

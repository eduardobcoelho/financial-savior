import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { IUserRepository } from 'src/users/repository/user.repository';

export interface ICreateUserService {
  exec: (data: CreateUserDto) => Promise<UserEntity>;
}

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async exec(data: CreateUserDto) {
    return await this.userRepository.create(data);
  }
}

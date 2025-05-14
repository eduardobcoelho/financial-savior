import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/user.entity';
import { ValidationMessages } from 'src/users/enum';
import { IUserRepository } from 'src/users/repository/user.repository';

export interface IFindUserByEmailService {
  exec: (email: string) => Promise<Omit<UserEntity, 'password'> | null>;
}

@Injectable()
export class FindUserByEmailService implements IFindUserByEmailService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async exec(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException(ValidationMessages.userNotFounded);

    return user;
  }
}

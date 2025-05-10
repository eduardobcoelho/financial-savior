import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { IUserRepository } from 'src/users/repository/user.repository';
import { FindUserByEmailService } from '../find-user-by-email/find-user-by-email.service';
import { ValidationMessages } from 'src/users/enum';

export interface ICreateUserService {
  exec: (data: CreateUserDto) => Promise<UserEntity>;
}

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('IFindUserByEmailService')
    private readonly findUserByEmailService: FindUserByEmailService,
  ) {}

  async exec(data: CreateUserDto) {
    let user: UserEntity | null = null;

    try {
      user = await this.findUserByEmailService.exec(data.email);
    } catch {
      user = null;
    }

    if (user) throw new BadRequestException(ValidationMessages.emailInvalid);
    return await this.userRepository.create(data);
  }
}

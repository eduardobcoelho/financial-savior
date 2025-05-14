import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { IUserRepository } from 'src/users/repository/user.repository';
import { FindUserByEmailService } from '../find-user-by-email/find-user-by-email.service';
import { ValidationMessages } from 'src/users/enum';
import * as bcrypt from 'bcrypt';

export interface ICreateUserService {
  exec: (data: CreateUserDto) => Promise<Omit<UserEntity, 'password'>>;
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
    let user: Omit<UserEntity, 'password'> | null = null;

    try {
      user = await this.findUserByEmailService.exec(data.email);
    } catch {
      user = null;
    }

    if (user) throw new BadRequestException(ValidationMessages.emailInvalid);

    const passwordBcrypted = bcrypt.hashSync(data.password, 10);

    return await this.userRepository.create({
      ...data,
      password: passwordBcrypted as string,
    });
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login-dto';
import { IAuthUserRepository } from 'src/auth/repository/auth-user.repository';
import { IFindUserByEmailService } from 'src/users/service/find-user-by-email/find-user-by-email.service';
import * as bcrypt from 'bcrypt';

export interface ILoginService {
  exec: (data: LoginDto) => Promise<void>;
}

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject('IFindUserByEmailService')
    private findUserByEmailService: IFindUserByEmailService,

    @Inject('IAuthUserRepository')
    private readonly authUserRepository: IAuthUserRepository,
  ) {}

  async exec(data: LoginDto) {
    try {
      const user = await this.findUserByEmailService.exec(data.email);

      const password = await this.authUserRepository.findPassword(
        user?.id as number,
      );

      bcrypt.compare(data.password, password as string, (err, result) => {
        if (!result || err)
          throw new BadRequestException('Email e/ou senha inválido(s)');

        return {};
      });
    } catch {
      throw new BadRequestException('Email e/ou senha inválido(s)');
    }
  }
}

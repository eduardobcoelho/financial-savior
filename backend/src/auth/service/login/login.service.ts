import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login-dto';
import { IAuthUserRepository } from 'src/auth/repository/auth-user.repository';
import { IFindUserByEmailService } from 'src/users/service/find-user-by-email/find-user-by-email.service';
import { ValidationMessages } from 'src/auth/enum';
import * as bcrypt from 'bcrypt';
import { ICreateUserTokenService } from '../create-user-token/create-user-token.service';
import { IGenerateJwtRefreshTokenService } from '../generate-jwt-refresh-token/generate-jwt-refresh-token.service';
import { GenerateJwtTokenService } from '../generate-jwt-token/generate-jwt-token.service';
import { LoginResponseDto } from 'src/auth/dto/login-response.dto';

export interface ILoginService {
  exec: (data: LoginDto) => Promise<LoginResponseDto>;
}

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject('IAuthUserRepository')
    private readonly authUserRepository: IAuthUserRepository,

    @Inject('IFindUserByEmailService')
    private findUserByEmailService: IFindUserByEmailService,

    @Inject('IGenerateJwtRefreshTokenService')
    private readonly generateJwtRefreshTokenService: IGenerateJwtRefreshTokenService,

    @Inject('ICreateUserTokenService')
    private readonly createUserTokenService: ICreateUserTokenService,

    @Inject('IGenerateJwtTokenService')
    private readonly generateJwtTokenService: GenerateJwtTokenService,
  ) {}

  async exec(data: LoginDto) {
    try {
      const user = await this.findUserByEmailService.exec(data.email);
      const userId = user?.id as number;
      const userEmail = user?.email as string;

      const password = await this.authUserRepository.findPassword(userId);

      const validPassword = await bcrypt.compare(
        data.password,
        password as string,
      );

      if (!validPassword || !password) {
        throw new BadRequestException(ValidationMessages.loginInvalid);
      }

      const refreshToken = await this.generateJwtRefreshTokenService.exec({
        userId,
        userEmail,
      });

      const userTokenRegister = await this.createUserTokenService.exec({
        userId,
        refreshToken,
      });

      const token = await this.generateJwtTokenService.exec({
        userTokenId: userTokenRegister.id,
        userId,
        userEmail,
      });

      return {
        token,
        refreshToken,
        user: {
          id: userId,
          email: userEmail,
        },
      };
    } catch {
      throw new BadRequestException(ValidationMessages.loginInvalid);
    }
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { ILoginService } from '../service/login/login.service';
import { LoginDto } from '../dto/login-dto';
import { LoginResponseDto } from '../dto/login-response.dto';

export interface ILoginUsecase {
  exec: (data: LoginDto) => Promise<LoginResponseDto>;
}

@Injectable()
export class LoginUsecase implements ILoginUsecase {
  constructor(
    @Inject('ILoginService')
    private readonly loginService: ILoginService,
  ) {}

  async exec(data: LoginDto) {
    return this.loginService.exec(data);
  }
}

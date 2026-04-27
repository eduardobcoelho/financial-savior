import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ILoginUsecase } from '../usecase/login.usecase';
import { LoginDto } from '../dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('ILoginUsecase')
    private readonly loginUsecase: ILoginUsecase,
  ) {}

  @Post('login')
  @HttpCode(201)
  async create(@Body(new ValidationPipe({ transform: true })) input: LoginDto) {
    return await this.loginUsecase.exec(input);
  }
}

import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ILoginService } from '../service/login/login.service';
import { LoginDto } from '../dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('ILoginService')
    private readonly loginService: ILoginService,
  ) {}

  @Post('login')
  @HttpCode(201)
  async create(@Body(new ValidationPipe({ transform: true })) input: LoginDto) {
    return await this.loginService.exec(input);
  }
}

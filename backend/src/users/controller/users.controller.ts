import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user-dto';
import { ICreateUserService } from '../service/create-user/create-user.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('ICreateUserService')
    private readonly createUserService: ICreateUserService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe({ transform: true })) input: CreateUserDto,
  ) {
    return await this.createUserService.exec(input);
  }
}

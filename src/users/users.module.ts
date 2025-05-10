import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UserRepository } from './repository/user.repository';
import { CreateUserService } from './service/create-user/create-user.service';

const repositoryProviders = [
  {
    provide: 'IUserRepository',
    useClass: UserRepository,
  },
];

const serviceProviders = [
  {
    provide: 'ICreateUserService',
    useClass: CreateUserService,
  },
];

@Module({
  controllers: [UsersController],
  providers: [...repositoryProviders, ...serviceProviders],
})
export class UsersModule {}

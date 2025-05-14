import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UserRepository } from './repository/user.repository';
import { CreateUserService } from './service/create-user/create-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { FindUserByEmailService } from './service/find-user-by-email/find-user-by-email.service';

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
  {
    provide: 'IFindUserByEmailService',
    useClass: FindUserByEmailService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [...repositoryProviders, ...serviceProviders],
  exports: [
    {
      provide: 'IFindUserByEmailService',
      useClass: FindUserByEmailService,
    },
  ],
})
export class UsersModule {}

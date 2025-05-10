import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UserRepository } from './repository/user.repository';
import { CreateUserService } from './service/create-user/create-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';

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
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [...repositoryProviders, ...serviceProviders],
})
export class UsersModule {}

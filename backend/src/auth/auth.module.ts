import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { UserTokenRepository } from './repository/user-token.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenEntity } from './entity/user-token.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserTokenService } from './service/create-user-token/create-user-token.service';
import { UsersModule } from 'src/users/users.module';
import { LoginService } from './service/login/login.service';
import { AuthUserRepository } from './repository/auth-user.repository';
import { UserEntity } from './entity/user.entity';
import { GenerateJwtRefreshTokenService } from './service/generate-jwt-refresh-token/generate-jwt-refresh-token.service';
import { GenerateJwtTokenService } from './service/generate-jwt-token/generate-jwt-token.service';
import { AuthJwtTokenGuard } from './guard/jwt-token/jwt-token.guard';
import { FindUserTokenService } from './service/find-user-token/find-user-token.service';
import { InvalidateUserTokensService } from './service/invalidate-user-tokens/invalidate-user-tokens.service';

const repositoryProviders = [
  {
    provide: 'IUserTokenRepository',
    useClass: UserTokenRepository,
  },
  {
    provide: 'IAuthUserRepository',
    useClass: AuthUserRepository,
  },
];

const serviceProviders = [
  // JWT
  {
    provide: 'IGenerateJwtRefreshTokenService',
    useClass: GenerateJwtRefreshTokenService,
  },
  {
    provide: 'IGenerateJwtTokenService',
    useClass: GenerateJwtTokenService,
  },
  // ...
  // user_tokens
  {
    provide: 'ICreateUserTokenService',
    useClass: CreateUserTokenService,
  },
  {
    provide: 'IFindUserTokenService',
    useClass: FindUserTokenService,
  },
  {
    provide: 'IInvalidateUserTokensService',
    useClass: InvalidateUserTokensService,
  },
  // LOGIN
  {
    provide: 'ILoginService',
    useClass: LoginService,
  },
];

const guardProviders = [AuthJwtTokenGuard];

const jwtModuleConfig = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.get<string>('NEST_JWT_SECRET'),
    signOptions: {
      expiresIn: config.get<string>('NEST_JWT_EXPIRES') || '1h',
    },
  }),
});

const moduleExports = [
  AuthJwtTokenGuard,
  jwtModuleConfig,
  {
    provide: 'IFindUserTokenService',
    useClass: FindUserTokenService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTokenEntity, UserEntity]),
    jwtModuleConfig,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [...repositoryProviders, ...serviceProviders, ...guardProviders],
  exports: [...moduleExports],
})
export class AuthModule {}

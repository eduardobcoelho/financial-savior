import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { UserTokenRepository } from './repository/user-token.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenEntity } from './entity/user-token.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GenerateJwtTokenService } from './service/generate-jwt-token/generate-jwt-token.service';
import { CreateUserTokenService } from './service/create-user-token/create-user-token.service';

const repositoryProviders = [
  {
    provide: 'IUserTokenRepository',
    useClass: UserTokenRepository,
  },
];

const serviceProviders = [
  // JWT
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
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTokenEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('NEST_JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('NEST_JWT_EXPIRES') || '1h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [...repositoryProviders, ...serviceProviders],
})
export class AuthModule {}

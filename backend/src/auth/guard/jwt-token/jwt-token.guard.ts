import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from 'src/auth/dto/token-dto';
import { IFindUserByEmailService } from 'src/users/service/find-user-by-email/find-user-by-email.service';
import { IFindUserTokenService } from 'src/auth/service/find-user-token/find-user-token.service';

interface AuthRequestConfig {
  headers: {
    authorization: string;
  };
}

@Injectable()
export class AuthJwtTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.validateRequest(context);
  }

  constructor(
    private readonly jwtService: JwtService,

    @Inject('IFindUserByEmailService')
    private readonly findUserByEmailService: IFindUserByEmailService,

    @Inject('IFindUserTokenService')
    private readonly findUserTokenService: IFindUserTokenService,
  ) {}

  async validateRequest(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<AuthRequestConfig>();
    const token = request?.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const {
        userTokenId,
        sub: userId,
        email,
      } = await this.jwtService.verifyAsync<TokenDto>(token);

      const userToken = await this.findUserTokenService.exec(userTokenId);
      const sameUserIdOnUserToken = userToken?.userId === userId;
      if (userToken?.revoked || !sameUserIdOnUserToken) {
        throw new UnauthorizedException();
      }

      const user = await this.findUserByEmailService.exec(email);
      if (userId !== user?.id) {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}

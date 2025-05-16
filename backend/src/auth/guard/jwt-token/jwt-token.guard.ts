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
  ) {}

  async validateRequest(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<AuthRequestConfig>();
    const token = request?.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const { sub: userId, email } =
        await this.jwtService.verifyAsync<TokenDto>(token);

      const user = await this.findUserByEmailService.exec(email);
      if (userId !== user?.id) throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}

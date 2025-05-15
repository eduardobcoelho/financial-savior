import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from 'src/auth/dto/token-dto';

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

  constructor(private readonly jwtService: JwtService) {}

  validateRequest(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<AuthRequestConfig>();
    const token = request?.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    let tokenDecoded: TokenDto | null = null;
    try {
      tokenDecoded = this.jwtService.verify<TokenDto>(token, {
        secret: process.env.NEST_JWT_SECRET,
      });

      console.log(tokenDecoded);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}

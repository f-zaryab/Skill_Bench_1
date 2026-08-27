import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from 'apps/test_app/src/users/application/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../types/jwt-payload.types';
import { SafeUser } from 'apps/test_app/src/users/domain/entities/user';
import { Request } from 'express';

type AuthenticatedCookieRequest = Omit<Request, 'cookies'> & {
  cookies: {
    Authentication?: string;
  };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const typedRequest = request as AuthenticatedCookieRequest;

          return typedRequest.cookies.Authentication ?? null;
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<SafeUser> {
    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.userService.toSafeUser(user);
  }
}

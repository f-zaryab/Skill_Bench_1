import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { RefreshTokenPayload } from '../../types/refresh-token-payload.types';

type RefreshCookieRequest = Omit<Request, 'cookies'> & {
  cookies: {
    Refresh?: string;
  };
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const typedRequest = request as RefreshCookieRequest;
          const refreshToken = typedRequest.cookies.Refresh;

          if (!refreshToken) {
            throw new UnauthorizedException('Refresh token missing.');
          }

          return refreshToken;
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: { sub: string }): RefreshTokenPayload {
    const typedRequest = request as RefreshCookieRequest;
    const refreshToken = typedRequest.cookies.Refresh;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing.');
    }

    return {
      userId: payload.sub,
      refreshToken,
    };
  }
}

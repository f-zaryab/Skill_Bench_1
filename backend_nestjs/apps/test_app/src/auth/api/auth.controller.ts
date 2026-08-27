import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDTO } from '../application/dtos/register-user.dto';
import { AuthService } from '../application/auth.service';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { RefreshTokenGuard } from './guards/refresh-toke.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { SafeUser } from '../../users/domain/entities/user';
import type { RefreshTokenPayload } from '../types/refresh-token-payload.types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? ('none' as const) : ('lax' as const),
      path: '/',
    };

    res.cookie('Authentication', accessToken, {
      ...cookieOptions,
      maxAge: Number(
        this.configService.getOrThrow<string>('ACCESS_COOKIE_MAX_AGE'),
      ),
    });

    res.cookie('Refresh', refreshToken, {
      ...cookieOptions,
      maxAge: Number(
        this.configService.getOrThrow<string>('REFRESH_COOKIE_MAX_AGE'),
      ),
    });
  }

  private clearAuthCookies(res: Response) {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? ('none' as const) : ('lax' as const),
      path: '/',
    };

    res.clearCookie('Authentication', cookieOptions);
    res.clearCookie('Refresh', cookieOptions);
  }

  //============================================================//
  // REGISTER --------------------------------------------------//
  @Post('register')
  async registerNewUser(
    @Body() body: RegisterUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.createUser(body);

    this.setAuthCookies(res, result.accessToken, result.refreshToken);

    return {
      success: true,
      message: 'User successfully created',
      data: { user: result.user },
    };
  }

  // LOGIN -----------------------------------------------------//
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: SafeUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.loginUser(user);

    this.setAuthCookies(res, result.accessToken, result.refreshToken);

    return {
      success: true,
      message: 'User successfully loggedin',
      data: { user: result.user },
    };
  }

  // REFRESH TOKEN ---------------------------------------------//
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(
    @CurrentUser() user: RefreshTokenPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.refreshTokens(
      user.userId,
      user?.refreshToken,
    );

    this.setAuthCookies(res, result.accessToken, result.refreshToken);

    return {
      success: true,
      message: 'Tokens refreshed successfully',
      data: { user: result.user },
    };
  }

  // LOGOUT ----------------------------------------------------//
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(
    @CurrentUser() user: SafeUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(user.id);

    this.clearAuthCookies(res);

    return {
      success: true,
      message: 'User logged out successfully',
      data: { user: {} },
    };
  }
}

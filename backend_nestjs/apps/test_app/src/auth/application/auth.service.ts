import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDTO } from './dtos/register-user.dto';
// Other Modules
import type { SafeUser } from '../../users/domain/entities/user';
import { UsersService } from '../../users/application/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // Signing Access Token
  private signAccessToken(user: SafeUser) {
    return this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.getOrThrow<number>(
          'JWT_ACCESS_EXPIRES_IN',
        ),
      },
    );
  }

  // Signing Refresh Token
  private signRefreshToken(user: SafeUser) {
    return this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.getOrThrow<number>(
          'JWT_REFRESH_EXPIRES_IN',
        ),
      },
    );
  }

  // Generating Access and Refresh Tokens
  private async generateTokens(user: SafeUser) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(user),
      this.signRefreshToken(user),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  // Hashing Refresh Token for DB and storing in DB
  private async saveHashedRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findByIdWithRefreshToken(userId);

    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Access denied.');
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Access denied.');
    }

    const safeUser = this.usersService.toSafeUser(user);
    const tokens = await this.generateTokens(safeUser);
    await this.saveHashedRefreshToken(user.id, tokens.refreshToken);

    return {
      user: safeUser,
      ...tokens,
    };
  }

  // Validate user existance and password against incoming email via strategy (used in strategy)
  async verifyUser(email: string, password: string) {
    const user = await this.usersService.getUser(email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return this.usersService.toSafeUser(user);
  }

  // REGISTER USER SERVICE -----------------------------------------//
  async createUser(data: RegisterUserDTO) {
    const user = await this.usersService.createUser(data);
    const tokens = await this.generateTokens(user);

    await this.saveHashedRefreshToken(user.id, tokens.refreshToken);

    return {
      user,
      ...tokens,
    };
  }

  // LOGIN USER SERVICE --------------------------------------------//
  async loginUser(user: SafeUser) {
    const tokens = await this.generateTokens(user);

    await this.saveHashedRefreshToken(user.id, tokens.refreshToken);

    return {
      user,
      ...tokens,
    };
  }

  // LOGOUT USER SERVICE -------------------------------------------//
  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
  }
}

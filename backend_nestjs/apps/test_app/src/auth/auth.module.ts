import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './api/auth.controller';
import { LocalStrategy } from './api/strategies/local.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGaurd } from './guards/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  @UseGuards(LocalAuthGaurd)
  @Post('login')
  login() {}
}

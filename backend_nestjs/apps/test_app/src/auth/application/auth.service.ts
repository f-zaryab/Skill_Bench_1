import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../../users/application/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser(email);

      if (!user) {
        throw new NotFoundException('Not valid email');
      }

      const isPasswordValid = await bcrypt.compare(password, user?.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException();
      }

      return user;
    } catch {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }
}

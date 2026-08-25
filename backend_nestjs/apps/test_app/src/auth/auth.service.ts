import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  verifyUser(email: string, password: string) {
    return {
      email,
      password,
    };
  }
}

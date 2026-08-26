import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../application/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // incoming request body will be passed down to this function
  /*
  So one thing that's key to note is that whatever we return from the validate method in passport, no
  matter what the strategy is, it's always going to be added to the current request object as the dot
  user property.
  */
  validate(username: string, password: string) {
    return this.authService.verifyUser(username, password);
  }
}

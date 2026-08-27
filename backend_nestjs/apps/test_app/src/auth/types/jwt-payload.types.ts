import { Role } from '../../users/domain/entities/user';

export type JwtPayload = {
  sub: string;
  email: string;
  role: Role;
};

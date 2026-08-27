import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';
import { Role } from 'apps/test_app/src/users/domain/entities/user';

export function Authorize(...roles: Role[]) {
  return applyDecorators(Roles(roles), UseGuards(JwtAuthGuard, RolesGuard));
}

/* 
USAGE
@Authorize(Role.ADMIN, Role.SUPER_ADMIN)

ORDER
1. JwtAuthGuard
   - reads the Authentication cookie
   - validates the JWT
   - sets request.user

2. RolesGuard
   - reads request.user.role
   - checks it against route metadata
*/

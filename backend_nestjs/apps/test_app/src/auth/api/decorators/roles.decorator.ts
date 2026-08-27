import { Reflector } from '@nestjs/core';
import { Role } from 'apps/test_app/src/users/domain/entities/user';

export const Roles = Reflector.createDecorator<Role[]>();

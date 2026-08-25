import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../domain/repositories/user.repository';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(data: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userRepo.createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.trim().toLowerCase(),
      password: hashedPassword,
    });
  }

  // Being used in Auth module
  async getUser(email: string) {
    const user = await this.userRepo.getUserByEmail(email.trim().toLowerCase());
    return user;
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../domain/repositories/user.repository';
import { SafeUser, User } from '../domain/entities/user';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  // Used in AUTH-Module ---------------------------------//
  async createUser(data: CreateUserDTO) {
    const existingUser = await this.userRepo.getUserByEmail(
      data.email.trim().toLowerCase(),
    );

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userRepo.createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.trim().toLowerCase(),
      password: hashedPassword,
    });
  }

  toSafeUser(user: User): SafeUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async getUser(email: string) {
    const user = await this.userRepo.getUserByEmail(email.trim().toLowerCase());
    return user;
  }

  async findByIdWithRefreshToken(userId: string) {
    return await this.userRepo.findByIdWithRefreshToken(userId);
  }

  // Used in AUTH-Module ---------------------------------//
  async updateRefreshToken(userId: string, hashedRefreshToken: string | null) {
    return this.userRepo.updateHashedRefreshToken(userId, hashedRefreshToken);
  }

  findById(id: string) {
    return this.userRepo.findById(id);
  }
}

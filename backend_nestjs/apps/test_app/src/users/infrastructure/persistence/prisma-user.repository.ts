import { Injectable } from '@nestjs/common';
import { Role, SafeUser, User } from '../../domain/entities/user';
import {
  CreateUserData,
  UserRepository,
} from '../../domain/repositories/user.repository';
import { PrismaService } from '@app/common/database/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  private mapRole(role: 'SUPER_ADMIN' | 'ADMIN' | 'USER'): Role {
    switch (role) {
      case 'SUPER_ADMIN':
        return Role.SUPER_ADMIN;

      case 'ADMIN':
        return Role.ADMIN;

      case 'USER':
        return Role.USER;
    }
  }

  private toDomainUser(user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
    hashedRefreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: this.mapRole(user.role),
      hashedRefreshToken: user.hashedRefreshToken,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // METHODS IMPLEMENTED ============================================//

  async createUser(data: CreateUserData): Promise<SafeUser> {
    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: 'USER',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: this.mapRole(user.role),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        role: true,
        hashedRefreshToken: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: this.mapRole(user.role),
      hashedRefreshToken: user.hashedRefreshToken,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findByIdWithRefreshToken(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? this.toDomainUser(user) : null;
  }

  async updateHashedRefreshToken(
    userId: string,
    hashedRefreshToken: string | null,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });

    return this.toDomainUser(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? this.toDomainUser(user) : null;
  }
}

import { SafeUser, User } from '../entities/user';

export type CreateUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export abstract class UserRepository {
  abstract createUser(data: CreateUserData): Promise<SafeUser>;

  abstract getUserByEmail(email: string): Promise<User | null>;

  abstract findById(id: string): Promise<User | null>;

  abstract findByIdWithRefreshToken(id: string): Promise<User | null>;

  abstract updateHashedRefreshToken(
    userId: string,
    hashedRefreshToken: string | null,
  ): Promise<User>;
}

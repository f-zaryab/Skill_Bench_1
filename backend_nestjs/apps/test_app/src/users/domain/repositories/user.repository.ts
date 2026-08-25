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
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  hashedRefreshToken: string | null;
};

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// export type UserWithoutPassword = Omit<User, 'password'>;

export type SafeUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

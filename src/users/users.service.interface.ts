import type { User } from './users.schema';

export interface IUsersService {
  create(userData: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export const USERS_SERVICE = 'USERS_SERVICE';

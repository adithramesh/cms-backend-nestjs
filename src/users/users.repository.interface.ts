import { User } from './users.schema';

export interface IUsersRepository {
  create(userData: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

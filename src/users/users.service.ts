import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(userData: Partial<User>): Promise<User> {
    return this.usersRepository.create(userData);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }
}

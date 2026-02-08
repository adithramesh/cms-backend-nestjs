import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.schema';
import { USERS_REPOSITORY } from './users.repository.interface';
import type { IUsersRepository } from './users.repository.interface';
import { IUsersService } from './users.service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    return await this.usersRepository.create(userData);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }
}

import { Controller, Inject } from '@nestjs/common';
import { type IUsersService, USERS_SERVICE } from './users.service.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}
}

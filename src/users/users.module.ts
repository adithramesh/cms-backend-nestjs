import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { USERS_REPOSITORY } from './users.repository.interface';
import { USERS_SERVICE } from './users.service.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: USERS_SERVICE,
      useClass: UsersService,
    },
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  controllers: [UsersController],
  exports: [USERS_SERVICE],
})
export class UsersModule {}

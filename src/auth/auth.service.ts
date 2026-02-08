import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from 'src/users/dto/register-dto';
import * as argon2 from 'argon2';
import {
  USERS_SERVICE,
  type IUsersService,
} from 'src/users/users.service.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly _usersService: IUsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async register(dto: RegisterDTO) {
    const existingUser = await this._usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await argon2.hash(dto.password);
    const user = await this._usersService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    return this.generateToken(user._id.toString(), user.name);
  }

  async login(email: string, password: string) {
    const user = await this._usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.generateToken(user._id.toString(), user.name);
  }

  private generateToken(userId: string, username: string) {
    return {
      access_token: this._jwtService.sign({ sub: userId, username }),
    };
  }
}

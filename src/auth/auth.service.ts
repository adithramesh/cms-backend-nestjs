import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from 'src/users/dto/register-dto';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDTO) {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await argon2.hash(dto.password);
    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    return this.generateToken(user._id.toString());
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.generateToken(user._id.toString());
  }

  private generateToken(userId: string) {
    return {
      access_token: this.jwtService.sign({ sub: userId }),
    };
  }
}

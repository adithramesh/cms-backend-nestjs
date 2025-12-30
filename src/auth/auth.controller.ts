import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from 'src/users/dto/register-dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
  @Get('protected')
  @UseGuards(JwtAuthGuard)
  test(@Req() req) {
    return req.user;
  }
}

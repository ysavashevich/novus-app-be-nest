import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { delay } from './utils';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('auth/register')
  async register(@Request() req) {
    await delay(2000);
    return this.authService.register(req.body);
  }

  @Post('auth/login')
  async login(@Request() req) {
    await delay(2000);
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );
    if (!user) {
      throw new BadRequestException('');
    }
    if (user) {
      return this.authService.login({ email: user.email, userId: user.id });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('temp')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('users')
  getUsers(): any {
    return this.usersService.findAll();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data) {
    data.password = await bcrypt.hash(data.password, 10);
    let response = await this.usersService.create(data);
    if (response) true;
    return null;
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(email);
      if (!user) return null;
      const { password: userPassword, ...result } = user;
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) return result;
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}

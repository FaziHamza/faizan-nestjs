/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string, userId?: string): Promise<any> {
    const query: any = { username };
    if (userId) {
      query._id = userId;
    }
    const user = await this.usersService.getUser(query);
    if (!user) return null;
    if (password && !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    return user;
  }
  
 
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(
        { username: user.username, sub: user._id },
        { expiresIn: '1h' },
      ),
    };
  }

}

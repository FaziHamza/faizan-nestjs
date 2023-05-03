import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const { username, sub } = payload;
      const user = await this.authService.validateUser(username, null, sub);
      if (!user) {
        throw new UnauthorizedException();
      }
      const accessToken = this.jwtService.sign({ username, sub });
      return { access_token: accessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

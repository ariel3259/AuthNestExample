import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import LocalGuard from './authentication/local-auth.guard';
import { AuthService } from './authentication/auth.service';
import JwtGuard from './authentication/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalGuard)
  @Post('auth/login')
  login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    return req.user;
  }
}

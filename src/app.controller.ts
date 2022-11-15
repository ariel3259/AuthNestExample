import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import LocalGuard from './authentication/local-auth.guard';
import { AuthService } from './authentication/auth.service';
import JwtGuard from './authentication/jwt-auth.guard';
import UsersDto from './users/dto/user.dto';
import { UsersService } from './users/users.service';
import { RolesGuard } from './authorization/roles.guard';
import { Role } from './authorization/role.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
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

  @UseGuards(JwtGuard, RolesGuard)
  @Get('register')
  @Role('admin')
  async register(@Body() userDto: UsersDto): Promise<void> {
    this.usersService.register(userDto);
  }
}

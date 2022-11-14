import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport/dist';
import LocalStrategy from './local.strategy';
import LocalGuard from './local-auth.guard';

@Module({
  providers: [AuthService, LocalStrategy, LocalGuard],
  imports: [UsersModule, PassportModule],
})
export class AuthModule {}

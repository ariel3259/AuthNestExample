import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport/dist';
import LocalStrategy from './local.strategy';
import LocalGuard from './local-auth.guard';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtConstants } from './constants';

@Module({
  providers: [AuthService, LocalStrategy, LocalGuard],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class AuthModule {}

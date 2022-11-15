import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport/dist';
import LocalStrategy from './local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConstants } from './constants';
import JwtStrategy from './jwt.strategy';

@Module({
  exports: [AuthService],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
})
export class AuthModule {}

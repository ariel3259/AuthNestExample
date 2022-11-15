import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    return {
      id: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}

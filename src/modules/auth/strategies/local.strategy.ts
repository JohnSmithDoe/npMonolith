import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ConfigService } from '../../config/config.service';
import { AuthService } from '../auth.service';

/**
 * Uses PassportStrategy and registers as the local strategy which validates
 * the user on login / register via email and password.
 *
 * Is used together with the LoginGuard
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super(configService.authStratgyOptions);
  }

  async validate(email: string, password: string) {
    return this.authService.validateUserByCredentials({ email, password });
  }
}

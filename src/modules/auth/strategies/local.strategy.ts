import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ConfigService } from '../../config/config.service';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super(configService.authStratgyOptions);
  }

  async validate(email: string, password: string) {
    // console.log('15: validate local strategy');
    return this.authService.validateUserByCredentials({ email, password });
  }
}

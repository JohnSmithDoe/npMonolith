import { registerAs } from '@nestjs/config';
import { IAuthModuleOptions } from '@nestjs/passport';
import { SessionOptions } from 'express-session';
import { isProduction } from '../../../common/utils';
import { typedProcessEnv } from '../config.types';

export type TAuthOptions = {
  authStrategyOptions: {
    usernameField: string;
  };
  authSessionOptions: SessionOptions;
  authModuleOptions: IAuthModuleOptions;
};

export const CCONFIG_KEY_AUTH = 'auth';

export default registerAs(CCONFIG_KEY_AUTH, (): TAuthOptions => {
  return {
    authStrategyOptions: {
      usernameField: 'email',
    },
    authModuleOptions: {
      session: true,
    },
    authSessionOptions: {
      secret: typedProcessEnv().APP_SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { httpOnly: true, sameSite: 'strict', secure: isProduction() },
    },
  };
});

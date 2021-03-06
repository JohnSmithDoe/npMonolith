import { registerAs } from '@nestjs/config';
import { IAuthModuleOptions } from '@nestjs/passport';
import { SessionOptions } from 'express-session';
import { isProduction } from '../../../common/utils';
import { process_env } from '../config.utils';

/** AuthorizationOptions of the application */
export type TAuthOptions = {
  authStrategyOptions: {
    usernameField: string;
  };
  authSessionOptions: SessionOptions;
  authModuleOptions: IAuthModuleOptions;
};

/** AuthorizationOptions key in the confguration */
export const CCONFIG_KEY_AUTH = 'auth';

/** Registers the AuthorizationOptions in the confguration */
export default registerAs(CCONFIG_KEY_AUTH, (): TAuthOptions => {
  return {
    authStrategyOptions: {
      usernameField: 'email',
    },
    authModuleOptions: {
      session: true,
    },
    authSessionOptions: {
      secret: process_env('APP_SESSION_SECRET'),
      resave: true,
      saveUninitialized: true,
      cookie: { httpOnly: true, sameSite: 'strict', secure: isProduction() },
    },
  };
});

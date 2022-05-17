import { registerAs } from '@nestjs/config';
import { typedProcessEnv } from '../config.types';

export type THttpOptions = {
  port: number;
};

export const CCONFIG_KEY_HTTP = 'http';

export default registerAs(
  CCONFIG_KEY_HTTP,
  (): THttpOptions => ({
    port: typedProcessEnv().APP_PORT,
  }),
);

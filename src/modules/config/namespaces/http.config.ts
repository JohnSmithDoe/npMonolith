import { registerAs } from '@nestjs/config';
import { process_env } from '../config.utils';

export type THttpOptions = {
  port: number;
};

export const CCONFIG_KEY_HTTP = 'http';

export default registerAs(
  CCONFIG_KEY_HTTP,
  (): THttpOptions => ({
    port: +process_env('APP_PORT'),
  }),
);

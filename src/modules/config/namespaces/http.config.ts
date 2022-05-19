import { registerAs } from '@nestjs/config';
import { process_env } from '../config.utils';

/** HttpOptions of the application */
export type THttpOptions = {
  port: number;
};

/** HttpOptions key in the confguration */
export const CCONFIG_KEY_HTTP = 'http';

/** Registers the HttpOptions in the confguration */
export default registerAs(
  CCONFIG_KEY_HTTP,
  (): THttpOptions => ({
    port: +process_env('APP_PORT'),
  }),
);

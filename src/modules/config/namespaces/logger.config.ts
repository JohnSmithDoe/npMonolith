import { registerAs } from '@nestjs/config';
import { utilities } from 'nest-winston';
import * as winston from 'winston';
import { process_env } from '../config.utils';

/** LoggerOptions of the application */
export type TLoggerOptions = winston.LoggerOptions & { logRequests: boolean };

/** LoggerOptions key in the confguration */
export const CCONFIG_KEY_LOGGER = 'logger';

/** Registers the LoggerOptions in the confguration */
export default registerAs(
  CCONFIG_KEY_LOGGER,
  (): TLoggerOptions => ({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          // winston.format.timestamp(),
          // winston.format.ms(),
          utilities.format.nestLike('MyApp', {
            prettyPrint: true,
          }),
        ),
      }),
      // other transports...
    ],
    logRequests: !!process_env('LOG_REQUESTS'),
  }),
);

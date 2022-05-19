import { registerAs } from '@nestjs/config';
import { utilities } from 'nest-winston';
import * as winston from 'winston';
import { process_env } from '../config.utils';

/** LoggerOptions of the application */
export type TLoggerOptions = winston.LoggerOptions & { logRequests: boolean };

/** LoggerOptions key in the confguration */
export const CCONFIG_KEY_LOGGER = 'logger';

/**
 * Registers the LoggerOptions in the confguration
 * Current transport protokolls are console and file (/data/logfile.log)
 */
export default registerAs(
  CCONFIG_KEY_LOGGER,
  (): TLoggerOptions => ({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          utilities.format.nestLike(process_env('APP_NAME') || 'App', {
            prettyPrint: true,
          }),
        ),
      }),
      // other transports...
      new winston.transports.File({
        dirname: 'data',
        filename: 'logfile.log',
        maxFiles: 3,
        maxsize: 1024e6,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          utilities.format.nestLike(process_env('APP_NAME') || 'App', {
            prettyPrint: true,
          }),
          winston.format.uncolorize(),
        ),
      }),
    ],
    logRequests: !!process_env('LOG_REQUESTS'),
  }),
);

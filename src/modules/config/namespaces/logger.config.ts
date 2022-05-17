import { registerAs } from '@nestjs/config';
import { utilities } from 'nest-winston';
import * as winston from 'winston';

export type TLoggerOptions = winston.LoggerOptions;

export const CCONFIG_KEY_LOGGER = 'logger';

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
    // other options
  }),
);

import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isDevelopment } from '../../../common/utils';
import { ESupportedDBTypes } from '../config.types';
import { process_env } from '../config.utils';

export type TConnectionOptions = TypeOrmModuleOptions;

export const CCONFIG_KEY_ORM = 'connection';

const CORM_MIGRATIONS_DIR = 'src/db/migrations/';
const CORM_MIGRATIONS_FILES = 'src/db/migrations/*.js';
const CORM_ENTITIES = isDevelopment() ? ['**/*.entity.js'] : ['**/*.entity.ts'];

export default registerAs(CCONFIG_KEY_ORM, (): TypeOrmModuleOptions => {
  return {
    synchronize: isDevelopment(),
    migrations: [CORM_MIGRATIONS_FILES],
    type: process_env('DB_TYPE') as ESupportedDBTypes,
    database: process_env('DB_NAME'),
    entities: CORM_ENTITIES,
    migrationsRun: !isDevelopment(),
    cli: {
      migrationsDir: CORM_MIGRATIONS_DIR,
    },
  };
});

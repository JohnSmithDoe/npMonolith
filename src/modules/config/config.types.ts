import { ENODE_ENV } from '../../common/consts';
import { CCONFIG_KEY_AUTH, TAuthOptions } from './namespaces/auth.config';
import {
  CCONFIG_KEY_DOCS,
  TDocumentationOptions,
} from './namespaces/docs.config';
import { CCONFIG_KEY_HTTP, THttpOptions } from './namespaces/http.config';
import { CCONFIG_KEY_LOGGER, TLoggerOptions } from './namespaces/logger.config';
import { CCONFIG_KEY_ORM, TConnectionOptions } from './namespaces/orm.config';

export enum ESupportedDBTypes {
  sqlite = 'sqlite',
}

export interface IEnvironmentVariables {
  NODE_ENV: ENODE_ENV;
  APP_SECRET: string;
  APP_SESSION_SECRET: string;
  APP_PORT: number;
  DB_NAME: string;
  DOC_PATH?: string | 'undefined';
  DOC_ROOT?: string | 'undefined';
  DB_TYPE: ESupportedDBTypes;
}

export interface IConfiguration extends IEnvironmentVariables {
  [CCONFIG_KEY_HTTP]: THttpOptions;
  [CCONFIG_KEY_AUTH]: TAuthOptions;
  [CCONFIG_KEY_ORM]: TConnectionOptions;
  [CCONFIG_KEY_LOGGER]: TLoggerOptions;
  [CCONFIG_KEY_DOCS]: TDocumentationOptions;
}

export const typedProcessEnv = () =>
  process.env as unknown as IEnvironmentVariables;

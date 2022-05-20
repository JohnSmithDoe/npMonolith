import { ENODE_ENV } from '../../common/consts';

/** Currently SupportedDBTypes */
export enum ESupportedDBTypes {
  sqlite = 'better-sqlite3',
}
/** Interface for all used environment variables */
export interface IEnvironmentVariables {
  NODE_ENV: ENODE_ENV;
  APP_SECRET: string;
  APP_SESSION_SECRET: string;
  APP_PORT: number;
  APP_NAME?: string;

  DB_TYPE: ESupportedDBTypes;
  DB_NAME: string;

  SERVE_DOC?: boolean;
  SERVE_DOC_PATH?: string;
  SERVE_DOC_ROOT?: string;
  SERVE_API?: boolean;


  LOG_REQUESTS?: boolean;
}

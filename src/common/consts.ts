export const CNODE_ENV = 'NODE_ENV';

export enum ENODE_ENV {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export const CENV_FILE_PATH = `environment/.env.${process.env.NODE_ENV}`;

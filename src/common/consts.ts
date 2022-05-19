/** Node Environment Key on process.env */
export const CNODE_ENV = 'NODE_ENV';
/** Possible Environment values */
export enum ENODE_ENV {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}
/** Environment File depends on the current setting */
export const CENV_FILE_PATH = `environment/.env.${process.env.NODE_ENV}`;

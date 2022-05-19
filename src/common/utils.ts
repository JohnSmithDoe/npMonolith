import { join, resolve } from 'path';
import { CNODE_ENV, ENODE_ENV } from './consts';

/**
 * Store the root directory by resolving the path from this file
 * BEWARE: If the file gets refactored we might need to adjust the resolve
 */
export const __baseDir = resolve(join(__dirname, '..', '..'));

/** Environment is set to development */
export function isDevelopment() {
  return process.env[CNODE_ENV] === ENODE_ENV.Development;
}

/** Environment is set to production */
export function isProduction() {
  return process.env[CNODE_ENV] === ENODE_ENV.Production;
}

/** Environment is set to test */
export function isTest() {
  return process.env[CNODE_ENV] === ENODE_ENV.Test;
}

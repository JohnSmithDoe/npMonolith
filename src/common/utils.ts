import { join, resolve } from 'path';
import { CNODE_ENV, ENODE_ENV } from './consts';

export function isDevelopment() {
  return process.env[CNODE_ENV] === ENODE_ENV.Development;
}

export function isProduction() {
  return process.env[CNODE_ENV] === ENODE_ENV.Production;
}

export function isTest() {
  return process.env[CNODE_ENV] === ENODE_ENV.Test;
}

export const __baseDir = resolve(join(__dirname, '..', '..'));

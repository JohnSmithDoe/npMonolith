import { IEnvironmentVariables } from './config.types';

/**
 *  Helper to access only environment variables declared in IEnvironmentVariables
 *
 *  BEWARE: Converts 'undefined' and 'false' to undefined
 */
export function process_env(key: keyof IEnvironmentVariables) {
  const envValue = process.env[key];
  return envValue === 'undefined' || envValue === 'false'
    ? undefined
    : envValue;
}

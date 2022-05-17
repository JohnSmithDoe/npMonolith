import { IEnvironmentVariables } from './config.types';

export function process_env(key: keyof IEnvironmentVariables) {
  const envValue = process.env[key];
  return envValue === 'undefined' || envValue === 'false'
    ? undefined
    : envValue;
}

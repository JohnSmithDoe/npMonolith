import { Expose, plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { ENODE_ENV } from '../../common/consts';
import { ESupportedDBTypes, IEnvironmentVariables } from './config.types';

class EnvironmentVariables implements IEnvironmentVariables {
  @Expose()
  @IsEnum(ENODE_ENV)
  NODE_ENV: ENODE_ENV;

  @Expose()
  @IsString()
  APP_SECRET: string;

  @Expose()
  @IsNumber()
  APP_PORT: number;

  @Expose()
  @IsString()
  APP_SESSION_SECRET: string;

  @Expose()
  @IsString()
  DB_NAME: string;

  @Expose()
  @IsEnum(ESupportedDBTypes)
  DB_TYPE: ESupportedDBTypes;

  @Expose()
  @IsOptional()
  DOC_PATH: string | 'undefined';

  @Expose()
  @IsOptional()
  DOC_ROOT: string | 'undefined';
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

import { Expose, plainToClass, Transform } from 'class-transformer';
import {
  IsBoolean,
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
  @Transform(({ value }) => +value)
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
  @IsBoolean()
  @Transform(({ value }) => !(value === 'false'))
  SERVE_DOC: boolean;

  @Expose()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => !(value === 'false'))
  SERVE_API: boolean;

  @Expose()
  @IsOptional()
  @IsString()
  SERVE_DOC_PATH?: string;

  @Expose()
  @IsOptional()
  SERVE_DOC_ROOT?: string;
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

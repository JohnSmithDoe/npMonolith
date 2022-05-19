import { Expose, plainToClass, Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';
import { ENODE_ENV } from '../../common/consts';
import { ESupportedDBTypes, IEnvironmentVariables } from './config.types';

/** Dto to validate the current environment variables */
class EnvironmentVariablesDto implements Required<IEnvironmentVariables> {
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
  @IsOptional()
  APP_NAME: string;

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
  SERVE_DOC_PATH: string;

  @Expose()
  @IsOptional()
  SERVE_DOC_ROOT: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => !(value === 'false'))
  LOG_REQUESTS: boolean;
}

/** Uses the class-transformer and the EnvironmentVariablesDto to validate the current environment */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariablesDto, config, {
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

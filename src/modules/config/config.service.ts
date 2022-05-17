import { Injectable, Logger } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { IAuthModuleOptions } from '@nestjs/passport';
import { SessionOptions } from 'express-session';
import { IConfiguration } from './config.types';
import { CCONFIG_KEY_AUTH, TAuthOptions } from './namespaces/auth.config';
import {
  CCONFIG_KEY_DOCS,
  TDocumentationOptions,
} from './namespaces/docs.config';
import { CCONFIG_KEY_HTTP, THttpOptions } from './namespaces/http.config';
import { CCONFIG_KEY_LOGGER, TLoggerOptions } from './namespaces/logger.config';
import { CCONFIG_KEY_ORM, TConnectionOptions } from './namespaces/orm.config';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);

  constructor(private configService: NestConfigService<IConfiguration, true>) {}

  get authConfiguration(): TAuthOptions {
    return this.configService.get(CCONFIG_KEY_AUTH);
  }

  get ormConfigiguration(): TConnectionOptions {
    return this.configService.get(CCONFIG_KEY_ORM);
  }

  get loggerConfiguration(): TLoggerOptions {
    return this.configService.get(CCONFIG_KEY_LOGGER);
  }

  get docsConfiguration(): TDocumentationOptions {
    return this.configService.get(CCONFIG_KEY_DOCS);
  }

  get httpConfiguration(): THttpOptions {
    return this.configService.get(CCONFIG_KEY_HTTP);
  }

  get APP_PORT(): number {
    return this.httpConfiguration.port;
  }

  get authModuleOptions(): IAuthModuleOptions {
    return this.authConfiguration.authModuleOptions;
  }

  get authSessionOptions(): SessionOptions {
    return this.authConfiguration.authSessionOptions;
  }

  get authStratgyOptions() {
    return this.authConfiguration.authStrategyOptions;
  }
}

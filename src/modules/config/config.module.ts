import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { CENV_FILE_PATH } from '../../common/consts';
import { ConfigService } from './config.service';
import { validate } from './config.validator';
import authConfigiguration from './namespaces/auth.config';
import documentConfiguration from './namespaces/docs.config';

import httpConfiguration from './namespaces/http.config';
import loggerConfiguration from './namespaces/logger.config';
import connectionConfiguration from './namespaces/orm.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: CENV_FILE_PATH,
      load: [
        httpConfiguration,
        authConfigiguration,
        loggerConfiguration,
        connectionConfiguration,
        documentConfiguration,
      ],
      validate,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

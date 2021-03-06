import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';

import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';

/**
 * AppModule imports all of the libraries used in the application
 * * ConfigModule: Own typed config module/service
 * * ServeStaticModule: Serve Swagger Api and CompoDoc
 * * WinstonModule: Logging
 * * TypeOrmModule: Database connection
 * * AuthModule: Application authorization/authentication module
 */
@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.docsConfiguration,
      inject: [ConfigService],
    }),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.loggerConfiguration,
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.ormConfigiguration,
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  private readonly logger: Logger = new Logger(AppModule.name);

  constructor(private readonly config: ConfigService) {}

  /**
   * Adds http request logging if LOG_REQUESTS is set in environment
   */
  configure(consumer: MiddlewareConsumer) {
    this.logger.log('Configuring AppModule');
    if (this.config.loggerConfiguration.logRequests) {
      this.logger.log('Configure request logging middleware');
      consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
  }
}

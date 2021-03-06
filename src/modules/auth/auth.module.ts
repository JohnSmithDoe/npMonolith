import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '../config/config.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './strategies/session.serializer';

/**
 * We use Passport and a local session strategy with email as user_id for now
 */
@Module({
  imports: [
    UsersModule,
    PassportModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.authModuleOptions,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    {
      provide: APP_GUARD,
      useExisting: AuthenticatedGuard,
    },
    AuthenticatedGuard,
  ],
  exports: [],
})
export class AuthModule implements NestModule {
  private readonly logger: Logger = new Logger(AuthModule.name);

  constructor(private readonly configService: ConfigService) {}

  /** Apply Session handling and Passport to the express handlers */
  configure(consumer: MiddlewareConsumer): any {
    this.logger.log('Configuring AuthModule');
    const sessionOptions = this.configService.authSessionOptions;
    consumer.apply(session(sessionOptions)).forRoutes('*');
    consumer.apply(passport.initialize()).forRoutes('*');
    consumer.apply(passport.session()).forRoutes('*');
  }
}

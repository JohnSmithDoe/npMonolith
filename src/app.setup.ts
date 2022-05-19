import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { EntityNotFoundFilter } from './common/filters/entity-not-found.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { EntityNotFoundInterceptor } from './common/interceptors/entity-not-found.interceptor';
import { ConfigService } from './modules/config/config.service';
import { process_env } from './modules/config/config.utils';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('np-Nest')
    .setDescription('The np-Nest API description')
    .setVersion('1.0')
    .addTag('npNest')
    .addSecurity('np-sec', {
      type: 'http',
      scheme: 'basic',
      description: 'Currently Cookie Auth with session',
      in: 'session',
      name: 'np-auth',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

export function setupApplication(
  app: INestApplication,
  config?: ConfigService,
) {
  if (process_env('SERVE_API')) {
    setupSwagger(app);
  }
  // Logger is independent
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // Middleware
  // Guards
  // Interceptors
  app.useGlobalInterceptors(new EntityNotFoundInterceptor());
  // Pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Exception Filters
  app.useGlobalFilters(new EntityNotFoundFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  /**
   * Secure the RESTful API
   *
   *  app.enableCors(corsConfigs);
   *     app.use(cookieParser());
   *     app.use(helmet());
   *     app.use(mongoSanitize());
   *     app.use(
   *         csurf({
   *             cookie: { sameSite: true },
   *             value: (req) => req.cookies['XSRF-TOKEN'],
   *         }),
   *     );
   *     app.use(csrf);
   *     // app.use(csurf({ cookie: true })); FIXME: does not work, but i still do not know why
   *     app.use(csrfErrorHandler);
   */
}

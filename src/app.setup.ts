import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { EntityNotFoundFilter } from './common/filters/entity-not-found.filter';
import { isDevelopment } from './common/utils';
import { ConfigService } from './modules/config/config.service';

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
  if (isDevelopment()) {
    setupSwagger(app);
  }
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new EntityNotFoundFilter());
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

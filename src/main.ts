import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApplication } from './app.setup';
import { ConfigService } from './modules/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config: ConfigService = app.get<ConfigService>(ConfigService);
  setupApplication(app, config);
  await app.listen(config.APP_PORT);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();

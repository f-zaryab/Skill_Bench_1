import { NestFactory } from '@nestjs/core';
import { TestAppModule } from './test_app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(TestAppModule);

  // ENABLE CORS
  app.enableCors();

  // GLOBAL VALIDATIONS
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Cookie Parser
  app.use(cookieParser());
  // LOGGER
  const loggerService = app.get(Logger);
  app.useLogger(loggerService);

  // CONFIG
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('PORT');

  await app.listen(port);
}

void bootstrap();

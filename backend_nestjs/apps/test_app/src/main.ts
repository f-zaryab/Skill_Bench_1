import { NestFactory } from '@nestjs/core';
import { TestAppModule } from './test_app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(TestAppModule);

  // CONFIG
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('PORT') ?? 3000;

  await app.listen(port);
}

void bootstrap();

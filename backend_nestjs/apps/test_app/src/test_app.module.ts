import { Module } from '@nestjs/common';
import { TestAppController } from './test_app.controller';
import { TestAppService } from './test_app.service';
// Shared Lib
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  controllers: [TestAppController],
  providers: [TestAppService],
})
export class TestAppModule {}

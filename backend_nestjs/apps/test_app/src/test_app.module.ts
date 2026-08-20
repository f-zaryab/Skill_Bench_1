import { Module } from '@nestjs/common';
import { TestAppController } from './test_app.controller';
import { TestAppService } from './test_app.service';
import { ConfigModule } from '@app/common/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [TestAppController],
  providers: [TestAppService],
})
export class TestAppModule {}

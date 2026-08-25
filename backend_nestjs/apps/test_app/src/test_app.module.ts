import { Module } from '@nestjs/common';
import { TestAppController } from './test_app.controller';
import { TestAppService } from './test_app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
// Shared Lib
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [TestAppController],
  providers: [TestAppService],
})
export class TestAppModule {}

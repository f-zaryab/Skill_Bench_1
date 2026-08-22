import { Module } from '@nestjs/common';
import { CategoriesController } from './api/categories.controller';
import { CategoriesService } from './application/categories.service';
import { CategoryRepository } from './domain/repositories/category.repository';
import { PrismaCategoryRepository } from './infrastructure/persistence/prisma-category.repository';
import { PrismaModule } from '@app/common/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
})
export class CategoriesModule {}

import { Injectable } from '@nestjs/common';
import { Category } from '../../domain/entities/category';
import {
  CategoryRepository,
  CreateCategoryData,
  FindCategoriesOptions,
  UpdateCategoryData,
} from '../../domain/repositories/category.repository';
import { PrismaService } from '@app/common/database/prisma/prisma.service';

@Injectable()
export class PrismaCategoryRepository extends CategoryRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  findAll(options?: FindCategoriesOptions): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        testPackages: options?.includePackages ?? false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });
  }

  findBySlug(slug: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {
        slug: slug,
      },
    });
  }

  create(data: CreateCategoryData): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  update(id: string, data: UpdateCategoryData): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id: id,
      },

      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}

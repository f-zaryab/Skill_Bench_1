import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import slugify from 'slugify';
import {
  CategoryRepository,
  FindCategoriesOptions,
} from '../domain/repositories/category.repository';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  findAll(options?: FindCategoriesOptions) {
    return this.categoryRepo.findAll(options);
  }

  findById(id: string) {
    return this.categoryRepo.findById(id);
  }

  findBySlug(slug: string, options?: FindCategoriesOptions) {
    return this.categoryRepo.findBySlug(slug, options);
  }

  async create(dto: CreateCategoryDTO, userId: string) {
    const slug = slugify(dto.slug ?? dto.name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existingCategory = await this.categoryRepo.findBySlug(slug);

    if (existingCategory) {
      throw new ConflictException(
        `Category with slug "${slug}" already exists`,
      );
    }

    return this.categoryRepo.create({
      name: dto.name,
      slug: slug,
      description: dto.description,
      createdByUserId: userId,
    });
  }

  async update(id: string, dto: UpdateCategoryDTO) {
    const existing = await this.categoryRepo.findById(id);

    if (!existing) {
      throw new NotFoundException(`Category with ID "${id}" was not found`);
    }

    let slug: string | undefined;

    if (dto.slug) {
      slug = slugify(dto.slug, {
        lower: true,
        strict: true,
        trim: true,
      });

      const categoryWithSlug = await this.categoryRepo.findBySlug(slug);

      if (categoryWithSlug && categoryWithSlug.id !== id) {
        throw new ConflictException(
          `Category with slug "${slug}" already exists`,
        );
      }
    }

    return this.categoryRepo.update(id, {
      name: dto.name,
      description: dto.description,
      slug: dto.slug,
    });
  }

  async delete(id: string) {
    const existing = await this.categoryRepo.findById(id);

    if (!existing) {
      throw new NotFoundException(`Category with ID "${id}" was not found`);
    }

    return this.categoryRepo.delete(id);
  }
}

import { Category } from '../entities/category';

export type CreateCategoryData = {
  name: string;
  slug: string;
  description?: string;
  createdByUserId: string;
};

export type UpdateCategoryData = {
  name?: string;
  slug?: string;
  description?: string;
};

export type FindCategoriesOptions = {
  includePackages?: boolean;
};

export abstract class CategoryRepository {
  abstract findAll(options?: FindCategoriesOptions): Promise<Category[]>;

  abstract findById(id: string): Promise<Category | null>;

  abstract create(data: CreateCategoryData): Promise<Category>;

  abstract findBySlug(slug: string): Promise<Category | null>;

  abstract update(id: string, data: UpdateCategoryData): Promise<Category>;

  abstract delete(id: string): Promise<void>;
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from '../application/categories.service';
import { CreateCategoryDTO } from '../application/dtos/create-category.dto';
import { UpdateCategoryDTO } from '../application/dtos/update-category.dto';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get('/')
  async findAll() {
    const categories = await this.categoryService.findAll();

    return {
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
    };
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const category = await this.categoryService.findById(id);

    return {
      success: true,
      message: 'Category fetched successfully',
      data: category,
    };
  }

  @Get('/slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const category = await this.categoryService.findBySlug(slug);

    return {
      success: true,
      message: 'Category fetched successfully',
      data: category,
    };
  }

  @Post('/')
  async create(@Body() data: CreateCategoryDTO) {
    const userID = '0f7c45b2-d34a-4d95-8b52-9a689823868a';

    const category = await this.categoryService.create(data, userID);

    return {
      success: true,
      message: 'Category created successfully',
      data: category,
    };
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateCategoryDTO) {
    const category = await this.categoryService.update(id, data);

    return {
      success: true,
      message: 'Category updated successfully',
      data: category,
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.categoryService.delete(id);

    return {
      success: true,
      message: 'Category deleted successfully',
    };
  }
}

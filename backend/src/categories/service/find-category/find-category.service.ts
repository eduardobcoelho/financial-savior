import { Inject, Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/categories/entity/category.entity';
import { ICategoryRepository } from 'src/categories/repository/category.repository';

export interface IFindCategoryService {
  exec: (categoryId: number) => Promise<CategoryEntity | null>;
}

@Injectable()
export class FindCategoryService implements IFindCategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async exec(categoryId: number) {
    return await this.categoryRepository.find(categoryId);
  }
}

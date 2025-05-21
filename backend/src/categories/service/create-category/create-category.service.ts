import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { CategoryEntity } from 'src/categories/entity/category.entity';
import { ICategoryRepository } from 'src/categories/repository/category.repository';

export interface ICreateCategoryService {
  exec: (data: CreateCategoryDto) => Promise<CategoryEntity>;
}

@Injectable()
export class CreateCategoryService implements ICreateCategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async exec(data: CreateCategoryDto) {
    return await this.categoryRepository.create(data);
  }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { CategoryEntity } from 'src/categories/entity/category.entity';
import { ICategoryRepository } from 'src/categories/repository/category.repository';
import { IFindCategoryService } from '../find-category/find-category.service';
import { ValidationMessages } from 'src/categories/enum';

export interface IUpdateCategoryService {
  exec: (
    categoryId: number,
    data: UpdateCategoryDto,
  ) => Promise<CategoryEntity>;
}

@Injectable()
export class UpdateCategoryService implements IUpdateCategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,

    @Inject('IFindCategoryService')
    private readonly findCategoryService: IFindCategoryService,
  ) {}

  async exec(categoryId: number, data: UpdateCategoryDto) {
    const category = await this.findCategoryService.exec(categoryId);
    if (!category) {
      throw new NotFoundException(ValidationMessages.categoryNotFound);
    }

    return await this.categoryRepository.update(categoryId, data);
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../entity/category.entity';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export interface ICategoryRepository {
  find: (categoryId: number) => Promise<CategoryEntity | null>;
  create: (data: CreateCategoryDto) => Promise<CategoryEntity>;
  update: (
    categoryId: number,
    data: UpdateCategoryDto,
  ) => Promise<CategoryEntity>;
  delete: (categoryId: number) => Promise<void>;
}

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  async find(categoryId: number) {
    return await this.repository.findOneBy({
      id: categoryId,
    });
  }

  async create(data: CreateCategoryDto) {
    const category = this.repository.create(data);
    return await this.repository.save(category);
  }

  async update(id: number, data: UpdateCategoryDto) {
    const user = await this.find(id);
    return await this.repository.save({ ...user, ...data });
  }

  async delete(id: number) {
    await this.repository.softDelete(id);
  }
}

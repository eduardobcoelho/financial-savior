import { Module } from '@nestjs/common';
import { CategoryEntity } from './entity/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repository/category.repository';

const repositoryProviders = [
  {
    provide: 'ICategoryRepository',
    useClass: CategoryRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [...repositoryProviders],
})
export class CategoriesModule {}

import { Module } from '@nestjs/common';
import { CategoryEntity } from './entity/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repository/category.repository';
import { CreateCategoryService } from './service/create-category/create-category.service';
import { UpdateCategoryService } from './service/update-category/update-category.service';
import { FindCategoryService } from './service/find-category/find-category.service';
import { CategoriesController } from './controller/categories.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

const repositoryProviders = [
  {
    provide: 'ICategoryRepository',
    useClass: CategoryRepository,
  },
];

const serviceProviders = [
  {
    provide: 'ICreateCategoryService',
    useClass: CreateCategoryService,
  },
  {
    provide: 'IUpdateCategoryService',
    useClass: UpdateCategoryService,
  },
  {
    provide: 'IFindCategoryService',
    useClass: FindCategoryService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    AuthModule,
    UsersModule,
  ],
  providers: [...repositoryProviders, ...serviceProviders],
  controllers: [CategoriesController],
})
export class CategoriesModule {}

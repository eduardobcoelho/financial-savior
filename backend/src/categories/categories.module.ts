import { Module } from '@nestjs/common';
import { CategoryEntity } from './entity/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
})
export class CategoriesModule {}

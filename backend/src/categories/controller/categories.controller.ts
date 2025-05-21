import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ICreateCategoryService } from '../service/create-category/create-category.service';
import { IUpdateCategoryService } from '../service/update-category/update-category.service';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { AuthJwtTokenGuard } from 'src/auth/guard/jwt-token/jwt-token.guard';

@Controller('categories')
@UseGuards(AuthJwtTokenGuard)
export class CategoriesController {
  constructor(
    @Inject('ICreateCategoryService')
    private readonly createCategoryService: ICreateCategoryService,

    @Inject('IUpdateCategoryService')
    private readonly updateCategoryService: IUpdateCategoryService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe({ transform: true })) input: CreateCategoryDto,
  ) {
    return await this.createCategoryService.exec(input);
  }

  @Put(':id')
  @HttpCode(201)
  async update(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body(new ValidationPipe({ transform: true })) input: UpdateCategoryDto,
  ) {
    return await this.updateCategoryService.exec(categoryId, input);
  }
}

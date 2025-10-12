import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthJwtTokenGuard } from 'src/auth/guard/jwt-token/jwt-token.guard';
import { CreateBoardDto } from '../dto/create-board.dto';
import { ICreateBoardService } from '../service/create-board/create-board.service';
import { IDeleteBoardService } from '../service/delete-board/delete-board.service';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { IUpdateBoardService } from '../service/update-board/update-board.service';

@Controller('boards')
@UseGuards(AuthJwtTokenGuard)
export class BoardsController {
  constructor(
    @Inject('ICreateBoardService')
    private readonly createBoardService: ICreateBoardService,

    @Inject('IDeleteBoardService')
    private readonly deleteBoardService: IDeleteBoardService,

    @Inject('IUpdateBoardService')
    private readonly updateBoardService: IUpdateBoardService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe({ transform: true })) data: CreateBoardDto,
  ) {
    return await this.createBoardService.exec(data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteBoardService.exec(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, data: UpdateBoardDto) {
    return await this.updateBoardService.exec(id, data);
  }
}

import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthJwtTokenGuard } from 'src/auth/guard/jwt-token/jwt-token.guard';
import { CreateBoardDto } from '../dto/create-board.dto';
import { ICreateBoardService } from '../service/create-board/create-board.service';
import { IDeleteBoardService } from '../service/delete-board/delete-board.service';

@Controller('boards')
@UseGuards(AuthJwtTokenGuard)
export class BoardsController {
  constructor(
    @Inject('ICreateBoardService')
    private readonly createBoardService: ICreateBoardService,

    @Inject('IDeleteBoardService')
    private readonly deleteBoardService: IDeleteBoardService,
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
}

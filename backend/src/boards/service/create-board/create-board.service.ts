import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { BoardEntity } from 'src/boards/entity/board.entity';
import { IBoardRepository } from 'src/boards/repository/board.repository';

export interface ICreateBoardService {
  exec: (data: CreateBoardDto) => Promise<BoardEntity>;
}

@Injectable()
export class CreateBoardService implements ICreateBoardService {
  constructor(
    @Inject('IBoardRepository')
    private readonly boardRepository: IBoardRepository,
  ) {}

  async exec(data: CreateBoardDto) {
    return await this.boardRepository.create(data);
  }
}

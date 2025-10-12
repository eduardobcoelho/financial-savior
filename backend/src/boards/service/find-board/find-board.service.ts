import { Inject, Injectable } from '@nestjs/common';
import { BoardEntity } from 'src/boards/entity/board.entity';
import { IBoardRepository } from 'src/boards/repository/board.repository';

export interface IFindBoardService {
  exec: (boardId: number) => Promise<BoardEntity | null>;
}

@Injectable()
export class FindBoardService implements IFindBoardService {
  constructor(
    @Inject('IBoardRepository')
    private readonly boardRepository: IBoardRepository,
  ) {}

  async exec(boardId: number) {
    return await this.boardRepository.find(boardId);
  }
}

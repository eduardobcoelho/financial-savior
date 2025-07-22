import { Inject, Injectable } from '@nestjs/common';
import { IBoardRepository } from 'src/boards/repository/board.repository';

export interface IDeleteBoardService {
  exec: (id: number) => Promise<void>;
}

@Injectable()
export class DeleteBoardService implements IDeleteBoardService {
  constructor(
    @Inject('IBoardRepository')
    private readonly boardRepository: IBoardRepository,
  ) {}

  async exec(id: number) {
    return await this.boardRepository.delete(id);
  }
}

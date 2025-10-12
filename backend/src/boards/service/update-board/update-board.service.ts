import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ValidationMessages } from 'src/categories/enum';
import { UpdateBoardDto } from 'src/boards/dto/update-board.dto';
import { IBoardRepository } from 'src/boards/repository/board.repository';
import { IFindBoardService } from '../find-board/find-board.service';
import { BoardEntity } from 'src/boards/entity/board.entity';

export interface IUpdateBoardService {
  exec: (categoryId: number, data: UpdateBoardDto) => Promise<BoardEntity>;
}

@Injectable()
export class UpdateBoardService implements IUpdateBoardService {
  constructor(
    @Inject('IBoardRepository')
    private readonly boardRepository: IBoardRepository,

    @Inject('IFindBoardService')
    private readonly findBoardService: IFindBoardService,
  ) {}

  async exec(boardId: number, data: UpdateBoardDto) {
    const category = await this.findBoardService.exec(boardId);
    if (!category) {
      throw new NotFoundException(ValidationMessages.categoryNotFound);
    }

    return await this.boardRepository.update(boardId, data);
  }
}

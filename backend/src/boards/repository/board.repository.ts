import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entity/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

export interface IBoardRepository {
  find: (boardId: number) => Promise<BoardEntity | null>;
  create: (data: CreateBoardDto) => Promise<BoardEntity>;
  delete: (id: number) => Promise<void>;
  update: (categoryId: number, data: UpdateBoardDto) => Promise<BoardEntity>;
}

@Injectable()
export class BoardRepository implements IBoardRepository {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly repository: Repository<BoardEntity>,
  ) {}

  async find(boardId: number) {
    return await this.repository.findOneBy({
      id: boardId,
    });
  }

  async create(data: CreateBoardDto) {
    const board = this.repository.create(data);
    return await this.repository.save(board);
  }

  async delete(id: number) {
    await this.repository.softDelete(id);
  }

  async update(id: number, data: UpdateBoardDto) {
    const user = await this.find(id);
    return await this.repository.save({ ...user, ...data });
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entity/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';

export interface IBoardRepository {
  create: (data: CreateBoardDto) => Promise<BoardEntity>;
  delete: (id: number) => Promise<void>;
}

@Injectable()
export class BoardRepository implements IBoardRepository {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly repository: Repository<BoardEntity>,
  ) {}

  async create(data: CreateBoardDto) {
    const board = this.repository.create(data);
    return await this.repository.save(board);
  }

  async delete(id: number) {
    await this.repository.softDelete(id);
  }
}

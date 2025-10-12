import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SheetEntity } from '../entity/sheet.entity';
import { CreateSheetDto } from '../dto/create-sheet.dto';

export interface ISheetRepository {
  create: (data: CreateSheetDto) => Promise<SheetEntity>;
}

@Injectable()
export class SheetRepository implements ISheetRepository {
  constructor(
    @InjectRepository(SheetEntity)
    private readonly repository: Repository<SheetEntity>,
  ) {}

  async create(data: CreateSheetDto) {
    const sheet = this.repository.create(data);
    return await this.repository.save(sheet);
  }
}

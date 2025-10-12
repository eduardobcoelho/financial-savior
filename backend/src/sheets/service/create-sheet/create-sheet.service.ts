import { Inject, Injectable } from '@nestjs/common';
import { CreateSheetDto } from 'src/sheets/dto/create-sheet.dto';
import { SheetEntity } from 'src/sheets/entity/sheet.entity';
import { ISheetRepository } from 'src/sheets/repository/sheet.repository';

export interface ICreateSheetService {
  exec: (data: CreateSheetDto) => Promise<SheetEntity>;
}

@Injectable()
export class CreateSheetService implements ICreateSheetService {
  constructor(
    @Inject('ISheetRepository')
    private readonly sheetRepository: ISheetRepository,
  ) {}

  async exec(data: CreateSheetDto) {
    return await this.sheetRepository.create(data);
  }
}

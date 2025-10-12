import { Module } from '@nestjs/common';
import { SheetsController } from './controller/sheets.controller';
import { CreateSheetService } from './service/create-sheet/create-sheet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetEntity } from './entity/sheet.entity';

const serviceProviders = [CreateSheetService];

@Module({
  imports: [TypeOrmModule.forFeature([SheetEntity])],
  controllers: [SheetsController],
  providers: [...serviceProviders],
})
export class SheetsModule {}

import { Module } from '@nestjs/common';
import { SheetsController } from './controller/sheets.controller';
import { CreateSheetService } from './service/create-sheet/create-sheet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetEntity } from './entity/sheet.entity';
import { SheetRepository } from './repository/sheet.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

const repositoryProviders = [
  {
    provide: 'ISheetRepository',
    useClass: SheetRepository,
  },
];

const serviceProviders = [
  { provide: 'ICreateSheetService', useClass: CreateSheetService },
];

@Module({
  imports: [TypeOrmModule.forFeature([SheetEntity]), AuthModule, UsersModule],
  controllers: [SheetsController],
  providers: [...repositoryProviders, ...serviceProviders],
})
export class SheetsModule {}

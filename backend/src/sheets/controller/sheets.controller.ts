import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthJwtTokenGuard } from 'src/auth/guard/jwt-token/jwt-token.guard';
import { ICreateSheetService } from '../service/create-sheet/create-sheet.service';
import { CreateSheetDto } from '../dto/create-sheet.dto';

@Controller('sheets')
@UseGuards(AuthJwtTokenGuard)
export class SheetsController {
  constructor(
    @Inject('ICreateSheetService')
    private readonly createSheetService: ICreateSheetService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe({ transform: true })) data: CreateSheetDto,
  ) {
    return await this.createSheetService.exec(data);
  }
}

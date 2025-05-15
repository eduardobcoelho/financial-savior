import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ICreatePlanningService } from '../service/create-planning/create-planning.service';
import { CreatePlanningDto } from '../dto/create-planning.dto';
import { AuthJwtTokenGuard } from 'src/auth/guard/jwt-token/jwt-token.guard';

@Controller('plannings')
@UseGuards(AuthJwtTokenGuard)
export class PlanningsController {
  constructor(
    @Inject('ICreatePlanningService')
    private readonly createPlanningService: ICreatePlanningService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe({ transform: true })) data: CreatePlanningDto,
  ) {
    return await this.createPlanningService.exec(data);
  }
}

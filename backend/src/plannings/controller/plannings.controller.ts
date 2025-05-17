import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ICreatePlanningService } from '../service/create-planning/create-planning.service';
import { CreatePlanningDto } from '../dto/create-planning.dto';
import { AuthJwtTokenGuard } from 'src/auth/guard/jwt-token/jwt-token.guard';
import { IDeletePlanningService } from '../service/delete-planning/delete-planning.service';

@Controller('plannings')
@UseGuards(AuthJwtTokenGuard)
export class PlanningsController {
  constructor(
    @Inject('ICreatePlanningService')
    private readonly createPlanningService: ICreatePlanningService,

    @Inject('IDeletePlanningService')
    private readonly deletePlanningService: IDeletePlanningService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe({ transform: true })) data: CreatePlanningDto,
  ) {
    return await this.createPlanningService.exec(data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deletePlanningService.exec(id);
  }
}

import { Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ICreatePlanningService } from '../service/create-planning/create-planning.service';
import { CreatePlanningDto } from '../dto/create-planning.dto';

@Controller('plannings')
export class PlanningsController {
  constructor(
    @Inject('ICreatePlanningService')
    private readonly createPlanningService: ICreatePlanningService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(data: CreatePlanningDto) {
    return await this.createPlanningService.exec(data);
  }
}

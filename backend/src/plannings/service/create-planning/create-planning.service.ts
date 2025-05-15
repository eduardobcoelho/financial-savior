import { Inject, Injectable } from '@nestjs/common';
import { CreatePlanningDto } from 'src/plannings/dto/create-planning.dto';
import { PlanningEntity } from 'src/plannings/entity/planning.entity';
import { IPlanningRepository } from 'src/plannings/repository/planning.repository';

export interface ICreatePlanningService {
  exec: (data: CreatePlanningDto) => Promise<PlanningEntity>;
}

@Injectable()
export class CreatePlanningService implements ICreatePlanningService {
  constructor(
    @Inject('IPlanningRepository')
    private readonly planningRepository: IPlanningRepository,
  ) {}

  async exec(data: CreatePlanningDto) {
    return await this.planningRepository.create(data);
  }
}

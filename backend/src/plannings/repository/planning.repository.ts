import { Injectable } from '@nestjs/common';
import { PlanningEntity } from '../entity/planning.entity';
import { CreatePlanningDto } from '../dto/create-planning.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface IPlanningRepository {
  create: (data: CreatePlanningDto) => Promise<PlanningEntity>;
}

@Injectable()
export class PlanningRepository implements IPlanningRepository {
  constructor(
    @InjectRepository(PlanningEntity)
    private readonly repository: Repository<PlanningEntity>,
  ) {}

  async create(data: CreatePlanningDto) {
    const planning = this.repository.create(data);
    return await this.repository.save(planning);
  }
}

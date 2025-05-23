import { Injectable } from '@nestjs/common';
import { PlanningEntity } from '../entity/planning.entity';
import { CreatePlanningDto } from '../dto/create-planning.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export interface IPlanningRepository {
  create: (data: CreatePlanningDto) => Promise<PlanningEntity>;
  delete: (id: number) => Promise<void>;
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

  async delete(id: number) {
    await this.repository.softDelete(id);
  }
}

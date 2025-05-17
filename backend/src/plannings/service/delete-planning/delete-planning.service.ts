import { Inject, Injectable } from '@nestjs/common';
import { IPlanningRepository } from 'src/plannings/repository/planning.repository';

export interface IDeletePlanningService {
  exec: (id: number) => Promise<void>;
}

@Injectable()
export class DeletePlanningService implements IDeletePlanningService {
  constructor(
    @Inject('IPlanningRepository')
    private readonly planningRepository: IPlanningRepository,
  ) {}

  async exec(id: number) {
    return await this.planningRepository.delete(id);
  }
}

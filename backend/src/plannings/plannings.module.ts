import { Module } from '@nestjs/common';
import { PlanningsController } from './controller/plannings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanningEntity } from './entity/planning.entity';
import { PlanningRepository } from './repository/planning.repository';
import { CreatePlanningService } from './service/create-planning/create-planning.service';

const repositoryProviders = [
  {
    provide: 'IPlanningRepository',
    useClass: PlanningRepository,
  },
];

const serviceProviders = [
  {
    provide: 'ICreatePlanningService',
    useClass: CreatePlanningService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([PlanningEntity])],
  controllers: [PlanningsController],
  providers: [...repositoryProviders, ...serviceProviders],
})
export class PlanningsModule {}

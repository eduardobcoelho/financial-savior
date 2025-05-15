import { Module } from '@nestjs/common';
import { PlanningsController } from './controller/plannings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanningEntity } from './entity/planning.entity';
import { PlanningRepository } from './repository/planning.repository';
import { CreatePlanningService } from './service/create-planning/create-planning.service';
import { AuthModule } from 'src/auth/auth.module';

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
  imports: [TypeOrmModule.forFeature([PlanningEntity]), AuthModule],
  controllers: [PlanningsController],
  providers: [...repositoryProviders, ...serviceProviders],
})
export class PlanningsModule {}

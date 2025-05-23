import { Module } from '@nestjs/common';
import { PlanningsController } from './controller/plannings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanningEntity } from './entity/planning.entity';
import { PlanningRepository } from './repository/planning.repository';
import { CreatePlanningService } from './service/create-planning/create-planning.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { DeletePlanningService } from './service/delete-planning/delete-planning.service';

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
  {
    provide: 'IDeletePlanningService',
    useClass: DeletePlanningService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([PlanningEntity]),
    AuthModule,
    UsersModule,
  ],
  controllers: [PlanningsController],
  providers: [...repositoryProviders, ...serviceProviders],
})
export class PlanningsModule {}

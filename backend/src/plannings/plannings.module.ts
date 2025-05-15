import { Module } from '@nestjs/common';
import { PlanningsController } from './controller/plannings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanningEntity } from './entity/planning.entity';
import { PlanningRepository } from './repository/planning.repository';

const repositoryProviders = [
  {
    provide: 'IPlanningRepository',
    useClass: PlanningRepository,
  },
];

// const serviceProviders = [
//   {
//     provide: 'ICreateUserService',
//     useClass: CreateUserService,
//   },
//   {
//     provide: 'IFindUserByEmailService',
//     useClass: FindUserByEmailService,
//   },
// ];

@Module({
  imports: [TypeOrmModule.forFeature([PlanningEntity])],
  controllers: [PlanningsController],
  providers: [...repositoryProviders],
})
export class PlanningsModule {}

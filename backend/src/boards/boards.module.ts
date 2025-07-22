import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { DeleteBoardService } from './service/delete-planning/delete-planning.service';
import { BoardRepository } from './repository/board.repository';
import { BoardEntity } from './entity/board.entity';
import { BoardsController } from './controller/boards.controller';
import { CreateBoardService } from './service/create-planning/create-planning.service';

const repositoryProviders = [
  {
    provide: 'IBoardRepository',
    useClass: BoardRepository,
  },
];

const serviceProviders = [
  {
    provide: 'ICreateBoardService',
    useClass: CreateBoardService,
  },
  {
    provide: 'IDeleteBoardService',
    useClass: DeleteBoardService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity]), AuthModule, UsersModule],
  controllers: [BoardsController],
  providers: [...repositoryProviders, ...serviceProviders],
})
export class BoardsModule {}

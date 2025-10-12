import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { DeleteBoardService } from './service/delete-board/delete-board.service';
import { BoardRepository } from './repository/board.repository';
import { BoardEntity } from './entity/board.entity';
import { BoardsController } from './controller/boards.controller';
import { CreateBoardService } from './service/create-board/create-board.service';
import { FindBoardService } from './service/find-board/find-board.service';
import { UpdateBoardService } from './service/update-board/update-board.service';

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
  {
    provide: 'IFindBoardService',
    useClass: FindBoardService,
  },
  {
    provide: 'IUpdateBoardService',
    useClass: UpdateBoardService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity]), AuthModule, UsersModule],
  controllers: [BoardsController],
  providers: [...repositoryProviders, ...serviceProviders],
})
export class BoardsModule {}

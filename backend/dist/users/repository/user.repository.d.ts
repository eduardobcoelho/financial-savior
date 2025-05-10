import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user-dto';
import { UserEntity } from '../entity/user.entity';
export interface IUserRepository {
    create: (data: CreateUserDto) => Promise<UserEntity>;
}
export declare class UserRepository implements IUserRepository {
    private readonly repository;
    constructor(repository: Repository<UserEntity>);
    create(data: CreateUserDto): Promise<UserEntity>;
}

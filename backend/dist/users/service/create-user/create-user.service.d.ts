import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { IUserRepository } from 'src/users/repository/user.repository';
export interface ICreateUserService {
    exec: (data: CreateUserDto) => Promise<UserEntity>;
}
export declare class CreateUserService implements ICreateUserService {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    exec(data: CreateUserDto): Promise<UserEntity>;
}

import { CreateUserDto } from '../dto/create-user-dto';
import { ICreateUserService } from '../service/create-user/create-user.service';
export declare class UsersController {
    private readonly createUserService;
    constructor(createUserService: ICreateUserService);
    create(input: CreateUserDto): Promise<import("../entity/user.entity").UserEntity>;
}

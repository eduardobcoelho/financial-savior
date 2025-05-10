"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./controller/users.controller");
const user_repository_1 = require("./repository/user.repository");
const create_user_service_1 = require("./service/create-user/create-user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const repositoryProviders = [
    {
        provide: 'IUserRepository',
        useClass: user_repository_1.UserRepository,
    },
];
const serviceProviders = [
    {
        provide: 'ICreateUserService',
        useClass: create_user_service_1.CreateUserService,
    },
];
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity])],
        controllers: [users_controller_1.UsersController],
        providers: [...repositoryProviders, ...serviceProviders],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map
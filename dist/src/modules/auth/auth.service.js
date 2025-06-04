"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const crypto = require("crypto");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    register(registerDto) {
        return this.userService.upsert(registerDto);
    }
    async login(loginDto) {
        const user = await this.userService.getBy('email', loginDto.email);
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                message: 'Usuário não encontrado',
            });
        }
        const hash = crypto.createHash('md5').update(loginDto.password).digest('hex');
        if (hash !== user.password) {
            throw new common_1.UnprocessableEntityException({
                message: 'Senha inválida',
            });
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
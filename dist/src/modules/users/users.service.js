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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const drizzle_provider_1 = require("../../db/drizzle.provider");
const neon_http_1 = require("drizzle-orm/neon-http");
const users_1 = require("../../db/schemas/users");
const drizzle_orm_1 = require("drizzle-orm");
const common_2 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
    }
    async update(id, data) {
        const user = await this.db.update(users_1.users).set(data).where((0, drizzle_orm_1.eq)(users_1.users.id, id)).returning();
        return user;
    }
    async upsert(data, relations = []) {
        const values = {
            name: data.name ?? null,
            email: data.email ?? null,
            phone: data.phone ?? null,
            password: data.password ? crypto.createHash('md5').update(data.password).digest('hex') : null,
        };
        let inserted;
        if (data.id) {
            inserted = await this.db.insert(users_1.users)
                .values({ ...values, id: data.id })
                .onConflictDoUpdate({
                target: users_1.users.id,
                set: values
            })
                .returning({ id: users_1.users.id });
        }
        else if (data.email) {
            inserted = await this.db.insert(users_1.users)
                .values(values)
                .onConflictDoUpdate({
                target: users_1.users.email,
                set: values
            })
                .returning({ id: users_1.users.id });
        }
        else if (data.phone) {
            inserted = await this.db.insert(users_1.users)
                .values(values)
                .onConflictDoUpdate({
                target: users_1.users.phone,
                set: values
            })
                .returning({ id: users_1.users.id });
        }
        else {
            inserted = await this.db.insert(users_1.users)
                .values(values)
                .returning({ id: users_1.users.id });
        }
        const user = await this.getBy('id', inserted[0].id, relations);
        return user;
    }
    async getBy(by, value, relations = []) {
        const result = this.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(users_1.users[by], value),
            with: relations.reduce((acc, relation) => {
                acc[relation] = true;
                return acc;
            }, {}),
        });
        return result;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)(drizzle_provider_1.DrizzleAsyncProvider)),
    __metadata("design:paramtypes", [neon_http_1.NeonHttpDatabase])
], UsersService);
//# sourceMappingURL=users.service.js.map
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
const users_1 = require("../../db/schemas/users");
const drizzle_orm_1 = require("drizzle-orm");
const common_2 = require("@nestjs/common");
const mysql2_1 = require("drizzle-orm/mysql2");
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
    }
    async update(id, data) {
        const updated = await this.db.update(users_1.users).set(data).where((0, drizzle_orm_1.eq)(users_1.users.id, id));
        const user = await this.getBy('id', id, ['goals', 'tasks', 'reminders']);
        return user;
    }
    async upsert(data, relations = [], onboardingStep = 0) {
        const values = {
            name: data.name ?? null,
            email: data.email ?? null,
            phone: data.phone ?? null,
            password: data.password ? crypto.createHash('md5').update(data.password).digest('hex') : null,
            onboarding_step: onboardingStep,
        };
        let inserted;
        if (data.id) {
            inserted = await this.db.insert(users_1.users)
                .values({ ...values, id: data.id })
                .onDuplicateKeyUpdate({
                set: values
            })
                .$returningId();
        }
        else if (data.email) {
            inserted = await this.db.insert(users_1.users)
                .values(values)
                .onDuplicateKeyUpdate({
                set: values
            })
                .$returningId();
        }
        else if (data.phone) {
            inserted = await this.db.insert(users_1.users)
                .values(values)
                .onDuplicateKeyUpdate({
                set: values
            })
                .$returningId();
        }
        else {
            inserted = await this.db.insert(users_1.users)
                .values(values)
                .$returningId();
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
    __metadata("design:paramtypes", [mysql2_1.MySql2Database])
], UsersService);
//# sourceMappingURL=users.service.js.map
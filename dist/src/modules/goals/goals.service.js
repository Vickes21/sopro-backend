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
exports.GoalsService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_provider_1 = require("../../db/drizzle.provider");
const neon_http_1 = require("drizzle-orm/neon-http");
const schema = require("../../db/schemas");
const drizzle_orm_1 = require("drizzle-orm");
let GoalsService = class GoalsService {
    constructor(db) {
        this.db = db;
    }
    async create(createGoalDto) {
        const inserted = await this.db.insert(schema.goals).values(createGoalDto).returning();
        return inserted[0];
    }
    async findAll() {
        return await this.db.query.goals.findMany({
            with: {
                user: true,
                tasks: true
            }
        });
    }
    async findOne(id) {
        return await this.db.query.goals.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.goals.id, id),
            with: {
                user: true,
                tasks: true
            }
        });
    }
    async update(id, updateGoalDto) {
        return await this.db.update(schema.goals).set(updateGoalDto).where((0, drizzle_orm_1.eq)(schema.goals.id, id));
    }
    async remove(id) {
        return await this.db.delete(schema.goals).where((0, drizzle_orm_1.eq)(schema.goals.id, id));
    }
};
exports.GoalsService = GoalsService;
exports.GoalsService = GoalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(drizzle_provider_1.DrizzleAsyncProvider)),
    __metadata("design:paramtypes", [neon_http_1.NeonHttpDatabase])
], GoalsService);
//# sourceMappingURL=goals.service.js.map
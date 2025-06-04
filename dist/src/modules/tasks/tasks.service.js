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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_provider_1 = require("../../db/drizzle.provider");
const mysql2_1 = require("drizzle-orm/mysql2");
const schema = require("../../db/schemas");
const drizzle_orm_1 = require("drizzle-orm");
let TasksService = class TasksService {
    constructor(db) {
        this.db = db;
    }
    async create(createTaskDto) {
        return await this.db.insert(schema.tasks).values(createTaskDto);
    }
    async findAll() {
        return await this.db.select().from(schema.tasks);
    }
    async findOne(id) {
        return await this.db.select().from(schema.tasks).where((0, drizzle_orm_1.eq)(schema.tasks.id, id));
    }
    async update(id, updateTaskDto) {
        return await this.db.update(schema.tasks).set(updateTaskDto).where((0, drizzle_orm_1.eq)(schema.tasks.id, id));
    }
    async remove(id) {
        return await this.db.delete(schema.tasks).where((0, drizzle_orm_1.eq)(schema.tasks.id, id));
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(drizzle_provider_1.DrizzleAsyncProvider)),
    __metadata("design:paramtypes", [mysql2_1.MySql2Database])
], TasksService);
//# sourceMappingURL=tasks.service.js.map
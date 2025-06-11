"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drizzleProvider = exports.DrizzleAsyncProvider = void 0;
const mysql2_1 = require("drizzle-orm/mysql2");
const config_1 = require("@nestjs/config");
const mysql = require("mysql2/promise");
const schema = require("./schemas");
exports.DrizzleAsyncProvider = 'DrizzleAsyncProvider';
exports.drizzleProvider = [
    {
        provide: exports.DrizzleAsyncProvider,
        inject: [config_1.ConfigService],
        useFactory: async (configService) => {
            const connectionString = configService.get('DATABASE_URL');
            const poolConnection = mysql.createPool(connectionString);
            return (0, mysql2_1.drizzle)({ client: poolConnection, schema, mode: 'default' });
        },
    },
];
//# sourceMappingURL=drizzle.provider.js.map
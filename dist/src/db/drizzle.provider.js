"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drizzleProvider = exports.DrizzleAsyncProvider = void 0;
const config_1 = require("@nestjs/config");
const neon_http_1 = require("drizzle-orm/neon-http");
const schema = require("./schemas");
const serverless_1 = require("@neondatabase/serverless");
exports.DrizzleAsyncProvider = 'DrizzleAsyncProvider';
exports.drizzleProvider = [
    {
        provide: exports.DrizzleAsyncProvider,
        inject: [config_1.ConfigService],
        useFactory: async (configService) => {
            const connectionString = configService.get('DATABASE_URL');
            const client = (0, serverless_1.neon)(connectionString);
            return (0, neon_http_1.drizzle)({
                client,
                schema,
            });
        },
    },
];
//# sourceMappingURL=drizzle.provider.js.map
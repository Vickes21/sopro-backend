"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStandaloneDb = createStandaloneDb;
const neon_http_1 = require("drizzle-orm/neon-http");
const schema = require("./schemas");
function createStandaloneDb() {
    return (0, neon_http_1.drizzle)(process.env.DATABASE_URL, {
        schema: schema,
    });
}
//# sourceMappingURL=standalone.js.map
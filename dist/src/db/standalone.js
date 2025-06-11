"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStandaloneDb = createStandaloneDb;
const mysql2_1 = require("drizzle-orm/mysql2");
const schema = require("./schemas");
function createStandaloneDb() {
    return (0, mysql2_1.drizzle)(process.env.DATABASE_URL, {
        schema: schema,
        mode: 'default',
    });
}
//# sourceMappingURL=standalone.js.map
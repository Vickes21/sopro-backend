"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = require("drizzle-orm/mysql2");
const promise_1 = require("mysql2/promise");
const schema = require("../schemas");
const path_1 = require("path");
const fs_1 = require("fs");
require("dotenv/config");
async function main() {
    const args = process.argv.slice(2);
    let schemaName = '';
    let seederFile = '';
    if (args.length === 0) {
        console.log('Nenhum argumento fornecido, executando o seeder principal (main.seeder.ts)');
        schemaName = '.';
        seederFile = 'main.seeder.ts';
    }
    else if (args.length === 1) {
        schemaName = '.';
        seederFile = args[0].endsWith('.ts') ? args[0] : `${args[0]}.seeder.ts`;
    }
    else {
        schemaName = args[0];
        seederFile = args[1].endsWith('.ts') ? args[1] : `${args[1]}.seeder.ts`;
    }
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('DATABASE_URL environment variable is not set');
        process.exit(1);
    }
    const poolConnection = promise_1.default.createPool(connectionString);
    const db = (0, mysql2_1.drizzle)({ client: poolConnection, schema, mode: 'default' });
    const seedersDir = path_1.default.join(__dirname, '..', 'seeders');
    const seederPath = path_1.default.join(seedersDir, schemaName, seederFile);
    if (!fs_1.default.existsSync(seederPath)) {
        console.error(`Seeder file not found: ${seederPath}`);
        console.error(`Make sure the file exists in the path: ${path_1.default.join('src/db/seeders', schemaName)}`);
        process.exit(1);
    }
    try {
        console.log(`Running seeder: ${seederFile} for schema: ${schemaName}`);
        const seeder = await Promise.resolve(`${seederPath}`).then(s => require(s));
        if (typeof seeder.seed !== 'function') {
            console.error(`The seeder file must export a 'seed' function`);
            process.exit(1);
        }
        await seeder.seed(db);
        console.log('Seeding completed successfully');
    }
    catch (error) {
        console.error('Error running seeder:', error);
        process.exit(1);
    }
    finally {
        await poolConnection.end();
    }
}
main().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map
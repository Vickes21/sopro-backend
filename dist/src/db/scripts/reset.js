"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = require("drizzle-orm/mysql2");
const promise_1 = require("mysql2/promise");
const drizzle_seed_1 = require("drizzle-seed");
const schema = require("../schemas");
require("dotenv/config");
async function main() {
    console.log('Iniciando reset do banco de dados...');
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('DATABASE_URL environment variable is not set');
        process.exit(1);
    }
    const poolConnection = promise_1.default.createPool(connectionString);
    const db = (0, mysql2_1.drizzle)({ client: poolConnection, schema, mode: 'default' });
    try {
        console.log('Resetando todas as tabelas...');
        await (0, drizzle_seed_1.reset)(db, schema);
        console.log('Reset concluído com sucesso!');
    }
    catch (error) {
        console.error('Erro ao resetar o banco de dados:', error);
        process.exit(1);
    }
    finally {
        await poolConnection.end();
    }
}
main().catch((error) => {
    console.error('Erro não tratado:', error);
    process.exit(1);
});
//# sourceMappingURL=reset.js.map
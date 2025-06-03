import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { reset } from 'drizzle-seed';
import * as schema from '../schemas';
import 'dotenv/config';

async function main() {
  console.log('Iniciando reset do banco de dados...');
  
  // Conectar ao banco de dados
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const poolConnection = mysql.createPool(connectionString);
  const db = drizzle({ client: poolConnection, schema, mode: 'default' });

  try {
    console.log('Resetando todas as tabelas...');
    await reset(db, schema);
    console.log('Reset concluído com sucesso!');
  } catch (error) {
    console.error('Erro ao resetar o banco de dados:', error);
    process.exit(1);
  } finally {
    await poolConnection.end();
  }
}

main().catch((error) => {
  console.error('Erro não tratado:', error);
  process.exit(1);
});
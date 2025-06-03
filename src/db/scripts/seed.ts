import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../schemas';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';

async function main() {
  // Get the seeder name from command line arguments
  const args = process.argv.slice(2);
  
  let schemaName = '';
  let seederFile = '';
  
  // Se não houver argumentos, execute o main.seeder.ts
  if (args.length === 0) {
    console.log('Nenhum argumento fornecido, executando o seeder principal (main.seeder.ts)');
    schemaName = '.';
    seederFile = 'main.seeder.ts';
  } else if (args.length === 1) {
    // Se houver apenas um argumento, assume que é o nome do seeder e procura na raiz
    schemaName = '.';
    seederFile = args[0].endsWith('.ts') ? args[0] : `${args[0]}.seeder.ts`;
  } else {
    // Caso contrário, usa os argumentos fornecidos
    schemaName = args[0];
    seederFile = args[1].endsWith('.ts') ? args[1] : `${args[1]}.seeder.ts`;
  }

  // Connect to the database
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const poolConnection = mysql.createPool(connectionString);
  const db = drizzle({ client: poolConnection, schema, mode: 'default' });

  // Construct the path to the seeder file
  const seedersDir = path.join(__dirname, '..', 'seeders');
  const seederPath = path.join(seedersDir, schemaName, seederFile);

  // Check if the seeder file exists
  if (!fs.existsSync(seederPath)) {
    console.error(`Seeder file not found: ${seederPath}`);
    console.error(`Make sure the file exists in the path: ${path.join('src/db/seeders', schemaName)}`);
    process.exit(1);
  }

  try {
    // Import and run the seeder
    console.log(`Running seeder: ${seederFile} for schema: ${schemaName}`);
    const seeder = await import(seederPath);
    
    if (typeof seeder.seed !== 'function') {
      console.error(`The seeder file must export a 'seed' function`);
      process.exit(1);
    }

    await seeder.seed(db);
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error running seeder:', error);
    process.exit(1);
  } finally {
    // Close the database connection
    await poolConnection.end();
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

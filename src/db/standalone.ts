import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "src/db/schemas";


export function createStandaloneDb() {
  return drizzle(process.env.DATABASE_URL, {
    schema: schema,
  });
}
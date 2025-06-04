import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../schemas';
export declare function seed(db: MySql2Database<typeof schema>): Promise<void>;

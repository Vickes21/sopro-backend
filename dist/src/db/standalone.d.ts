import * as schema from "src/db/schemas";
export declare function createStandaloneDb(): import("drizzle-orm/mysql2").MySql2Database<typeof schema> & {
    $client: import("drizzle-orm/mysql2").AnyMySql2Connection;
};

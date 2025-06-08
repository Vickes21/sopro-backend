import * as schema from "src/db/schemas";
export declare function createStandaloneDb(): import("drizzle-orm/neon-http").NeonHttpDatabase<typeof schema> & {
    $client: import("@neondatabase/serverless").NeonQueryFunction<any, any>;
};

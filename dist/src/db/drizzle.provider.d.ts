import { ConfigService } from '@nestjs/config';
import * as mysql from "mysql2/promise";
import * as schema from './schemas';
export declare const DrizzleAsyncProvider = "DrizzleAsyncProvider";
export declare const drizzleProvider: {
    provide: string;
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Promise<import("drizzle-orm/mysql2").MySql2Database<typeof schema> & {
        $client: mysql.Pool;
    }>;
}[];

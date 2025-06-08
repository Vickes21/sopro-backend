import { ConfigService } from '@nestjs/config';
import * as schema from './schemas';
export declare const DrizzleAsyncProvider = "DrizzleAsyncProvider";
export declare const drizzleProvider: {
    provide: string;
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Promise<import("drizzle-orm/neon-http").NeonHttpDatabase<typeof schema> & {
        $client: import("@neondatabase/serverless").NeonQueryFunction<false, false>;
    }>;
}[];

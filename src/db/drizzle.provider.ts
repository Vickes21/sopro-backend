import { ConfigService } from '@nestjs/config';
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from './schemas';
import { neon } from '@neondatabase/serverless';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const connectionString = configService.get<string>('DATABASE_URL');      
      const client = neon(connectionString);      

      return drizzle({
        client,
        schema,
      });
    },
  },
];
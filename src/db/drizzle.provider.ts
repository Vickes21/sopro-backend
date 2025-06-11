import { drizzle } from 'drizzle-orm/mysql2';
import { ConfigService } from '@nestjs/config';
import * as mysql from "mysql2/promise";
import * as schema from './schemas';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const connectionString = configService.get<string>('DATABASE_URL');      
      const poolConnection = mysql.createPool(connectionString);
      

      return drizzle({ client: poolConnection, schema, mode: 'default' });
    },
  },
];
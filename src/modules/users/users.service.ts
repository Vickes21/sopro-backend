import { Injectable } from '@nestjs/common';
import { TUser } from 'src/db/schemas/users';
import * as crypto from 'crypto';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from 'src/db/schemas';
import { users } from 'src/db/schemas/users';
import { eq } from 'drizzle-orm';
import { Inject } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NeonHttpDatabase<typeof schema>,
  ) { }

  async update(id: number, data: Partial<TUser>) {
    const user = await this.db.update(users).set(data).where(eq(users.id, id)).returning()
    return user;
  }

  async upsert(data: Partial<TUser>, relations: string[] = []) {
    // Create values object with non-null fields
    const values = {
      name: data.name ?? null,
      email: data.email ?? null,
      phone: data.phone ?? null,
      password: data.password ? crypto.createHash('md5').update(data.password).digest('hex') : null,
    };
    
    let inserted;
    
    // Determine which field to use for conflict resolution
    if (data.id) {
      // If we have an ID, use it for conflict resolution
      inserted = await this.db.insert(users)
        .values({ ...values, id: data.id })
        .onConflictDoUpdate({
          target: users.id,
          set: values
        })
        .returning({ id: users.id });
    } else if (data.email) {
      // If we have an email, use it for conflict resolution
      inserted = await this.db.insert(users)
        .values(values)
        .onConflictDoUpdate({
          target: users.email,
          set: values
        })
        .returning({ id: users.id });
    } else if (data.phone) {
      // If we have a phone, use it for conflict resolution
      inserted = await this.db.insert(users)
        .values(values)
        .onConflictDoUpdate({
          target: users.phone,
          set: values
        })
        .returning({ id: users.id });
    } else {
      // If we don't have any unique identifier, just insert
      inserted = await this.db.insert(users)
        .values(values)
        .returning({ id: users.id });
    }
    //get with relations
    const user = await this.getBy('id', inserted[0].id, relations) as TUser;

    //at this point the contact is created and relations are loaded
    //we can return the contact. For sure the contact exists
    return user;
  }

  async getBy(by: 'id' | 'email' | 'phone', value: string | number, relations: string[] = []): Promise<TUser | undefined> {
    const result = this.db.query.users.findFirst({
      where: eq(users[by], value),
      with: relations.reduce((acc, relation) => {
        acc[relation] = true;
        return acc;
      }, {} as Record<string, boolean>),
    }) as unknown as TUser;
    return result;
  }
}

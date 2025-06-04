import { Injectable } from '@nestjs/common';
import { TRegisterDto } from 'src/modules/auth/dto/register.dto';
import { TUser } from 'src/db/schemas/users';
import * as crypto from 'crypto';
import { DrizzleAsyncProvider } from 'src/db/drizzle.provider';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from 'src/db/schemas';
import { users } from 'src/db/schemas/users';
import { eq } from 'drizzle-orm';
import { Inject } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: MySql2Database<typeof schema>,
  ) { }

  async update(id: number, data: Partial<TUser>) {
    const updated = await this.db.update(users).set(data).where(eq(users.id, id))
    const user = await this.getBy('id', id)
    return user;
  }

  async upsert(data: Partial<TUser>, relations: string[] = []) {
    const inserted = await this.db.insert(users).values({
      name: data.name ? data.name : null,
      email: data.email ? data.email : null,
      phone: data.phone ? data.phone : null,
      //create hash
      password: data.password ? crypto.createHash('md5').update(data.password).digest('hex') : null,
    }).onDuplicateKeyUpdate({
      set: {
        name: data.name ? data.name : null,
        email: data.email ? data.email : null,
        phone: data.phone ? data.phone : null,
        //create hash
        password: data.password ? crypto.createHash('md5').update(data.password).digest('hex') : null,
      }
    }).$returningId();
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

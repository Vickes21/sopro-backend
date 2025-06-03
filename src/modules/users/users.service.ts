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
import { phoneSerialize } from 'src/lib/utils';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: MySql2Database<typeof schema>,
  ) { }

  async upsert(data: TRegisterDto, relations: string[] = []) {
    const inserted = await this.db.insert(users).values({
      name: data.name,
      email: data.email,
      phone: phoneSerialize(data.phone),
      //create hash
      password: crypto.createHash('md5').update(data.password).digest('hex'),
    }).onDuplicateKeyUpdate({
      set: {
        name: data.name,
        email: data.email,
        phone: phoneSerialize(data.phone),
        //create hash
        password: crypto.createHash('md5').update(data.password).digest('hex'),
      }
    }).$returningId();
    //get with relations
    const user = await this.getBy('id', inserted[0].id.toString(), relations) as TUser;

    //at this point the contact is created and relations are loaded
    //we can return the contact. For sure the contact exists
    return user;
  }

  async getBy(by: 'id' | 'email' | 'phone', value: string, relations: string[] = []): Promise<TUser | undefined> {
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

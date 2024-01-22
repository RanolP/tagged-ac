import Database from 'better-sqlite3';
import {
  BetterSQLite3Database,
  drizzle as drizzleSqlite,
} from 'drizzle-orm/better-sqlite3';
import { migrate as migrateSqlite } from 'drizzle-orm/better-sqlite3/migrator';
import { drizzle as drizzleD1, DrizzleD1Database } from 'drizzle-orm/d1';
import { migrate as migrateD1 } from 'drizzle-orm/d1/migrator';
import { EventHandlerRequest, H3Event } from 'vinxi/server';

import * as schema from './schema';

const MIGRATIONS_FOLDER = new URL('migrations', import.meta.url).pathname;

let sqliteDbCache: [BetterSQLite3Database<typeof schema>, () => void] | null =
  null;

export function createDatabase(
  event: H3Event<EventHandlerRequest>,
): [
  DrizzleD1Database<typeof schema> | BetterSQLite3Database<typeof schema>,
  () => void,
] {
  if (import.meta.env.PROD) {
    const db = drizzleD1(event.context.cloudflare.env.DB, { schema });
    return [db, () => migrateD1(db, { migrationsFolder: MIGRATIONS_FOLDER })];
  } else {
    if (sqliteDbCache) return sqliteDbCache;
    const db = drizzleSqlite(new Database('.local.db'), { schema });
    sqliteDbCache = [
      db,
      () => migrateSqlite(db, { migrationsFolder: MIGRATIONS_FOLDER }),
    ];
    return sqliteDbCache;
  }
}

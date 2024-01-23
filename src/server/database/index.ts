import Database from 'better-sqlite3';
import {
  BetterSQLite3Database,
  drizzle as drizzleSqlite,
} from 'drizzle-orm/better-sqlite3';
import { migrate as migrateSqlite } from 'drizzle-orm/better-sqlite3/migrator';
import { drizzle as drizzleD1, DrizzleD1Database } from 'drizzle-orm/d1';
import { EventHandlerRequest, H3Event } from 'vinxi/server';

import * as schema from './schema';

const MIGRATIONS_FOLDER = new URL('../../../migrations', import.meta.url)
  .pathname;

let sqliteDbCache: BetterSQLite3Database<typeof schema> | null = null;

export function createDatabase(
  event: H3Event<EventHandlerRequest>,
): DrizzleD1Database<typeof schema> | BetterSQLite3Database<typeof schema> {
  if (import.meta.env.PROD) {
    const db = drizzleD1(event.context.cloudflare.env.DB, { schema });
    return db;
  } else {
    if (sqliteDbCache) return sqliteDbCache;
    const db = drizzleSqlite(new Database('.local.db'), { schema });
    migrateSqlite(db, { migrationsFolder: MIGRATIONS_FOLDER });
    sqliteDbCache = db;
    return sqliteDbCache;
  }
}

import Database from 'better-sqlite3';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import { migrate as migrateSqlite } from 'drizzle-orm/better-sqlite3/migrator';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { migrate as migrateD1 } from 'drizzle-orm/d1/migrator';

import * as schema from './schema';

const MIGRATIONS_FOLDER = new URL('migrations', import.meta.url).pathname;

export const [db, migrate] = import.meta.env.PROD
  ? (() => {
      const db = drizzleD1(import.meta.env.DB, { schema });
      return [db, () => migrateD1(db, { migrationsFolder: MIGRATIONS_FOLDER })];
    })()
  : (() => {
      const db = drizzleSqlite(new Database('.local.db'), { schema });
      return [
        db,
        () => migrateSqlite(db, { migrationsFolder: MIGRATIONS_FOLDER }),
      ];
    })();

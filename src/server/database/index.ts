import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import { D1Dialect } from 'kysely-d1';

import { DB } from './types';

const dialect = import.meta.env?.PROD
  ? new D1Dialect({ database: import.meta.env.DB })
  : new SqliteDialect({
      database: new SQLite('.local.db'),
    });
export const db = new Kysely<DB>({
  dialect,
});

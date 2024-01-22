import fs from 'node:fs/promises';
import path from 'node:path';

import { FileMigrationProvider, Migrator } from 'kysely';

import { db } from '../../src/server/database';

export const DATABASE_FOLDER = new URL(
  '../../src/server/database',
  import.meta.url,
).pathname;
export const MIGRATION_FOLDER = path.join(DATABASE_FOLDER, 'migrations');

export const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    migrationFolder: MIGRATION_FOLDER,
    path,
  }),
});

import type { Kysely } from 'kysely';
import { sql } from 'kysely';

import type { DB } from '~/server/database/types';

export async function up(db: Kysely<DB>) {
  await sql`
-- CreateTable
CREATE TABLE "Advertisement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "valid_until" DATETIME NOT NULL
);

`.execute(db);
}

export async function down(db: Kysely<DB>) {
  await sql`
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Advertisement";
PRAGMA foreign_keys=on;

`.execute(db);
}
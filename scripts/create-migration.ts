import fs from 'node:fs/promises';
import path from 'node:path';

import { $ } from 'execa';
import prompts from 'prompts';

import { MIGRATION_FOLDER, migrator } from './_utils/file-migrator';

const FILE = 'prisma/schema.prisma';
const DATA_MODEL = 'schema-datamodel';
const DATA_SOURCE = 'schema-datasource';

const TYPES = '~/server/database/types';

console.log(process.cwd());

await $({
  stdio: 'inherit',
})`pnpm exec prisma migrate diff --from-${DATA_SOURCE} ${FILE} --to-${DATA_MODEL} ${FILE}`;

const { stdout: up } =
  await $`pnpm exec prisma migrate diff --from-${DATA_SOURCE} ${FILE} --to-${DATA_MODEL} ${FILE} --script`;

const { stdout: down } =
  await $`pnpm exec prisma migrate diff --from-${DATA_MODEL} ${FILE} --to-${DATA_SOURCE} ${FILE} --script`;

const { name } = await prompts({
  name: 'name',
  type: 'text',
  message: 'Enter migration name',
});

await fs.mkdir(MIGRATION_FOLDER, { recursive: true });

const migrations = await migrator.getMigrations();
const migrationNo = migrations.length.toString().padStart(4, '0');
const filename = `${migrationNo}_${name}.ts`;

await fs.writeFile(
  path.join(MIGRATION_FOLDER, filename),
  `
import type { Kysely } from 'kysely';
import { sql } from 'kysely';

import type { DB } from '${TYPES}';

export async function up(db: Kysely<DB>) {
  await sql\`
${up}
\`.execute(db);
}

export async function down(db: Kysely<DB>) {
  await sql\`
${down}
\`.execute(db);
}
  `.trim(),
);

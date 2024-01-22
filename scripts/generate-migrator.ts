import fs from 'node:fs/promises';
import path from 'node:path';

import { DATABASE_FOLDER, migrator } from './_utils/file-migrator';

const migrations = await migrator.getMigrations();

const names = migrations.map((x) => x.name);

await fs.writeFile(
  path.join(DATABASE_FOLDER, 'migrator.ts'),
  `
import { Migrator } from 'kysely';

import { db } from '.';

export const migrator = new Migrator({
  db,
  provider: {
    getMigrations: async () => {
      const [${names.map((x) => `_${x}`).join(',')}] = await Promise.all([${names.map((x) => `import('./migrations/${x}')`).join(', ')}]);
      return { ${names.map((x) => `'${x}': _${x}`).join(',')} };
    },
  },
});
`.trim(),
);

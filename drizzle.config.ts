import { Config } from 'drizzle-kit';

export default {
  schema: 'src/server/database/schema.ts',
  out: 'src/server/database/migrations/',
} satisfies Config;

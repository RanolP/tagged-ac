import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const advertisement = sqliteTable('Advertisement', {
  id: text('id').primaryKey(),
  valid_until: text('valid_until').notNull(),
});

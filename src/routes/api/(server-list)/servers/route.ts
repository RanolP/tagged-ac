import dayjs from 'dayjs';
import { gte } from 'drizzle-orm';

import { advertisement } from '~/server/database/schema';

import { defineApiRoute } from '../../_util/define-api-route';

export const GET = defineApiRoute({}, async ({ db }) => {
  return await db
    .select({
      id: advertisement.id,
    })
    .from(advertisement)
    .where(gte(advertisement.valid_until, dayjs().toISOString()))
    .execute();
});
